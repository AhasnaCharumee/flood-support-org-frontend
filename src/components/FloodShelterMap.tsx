'use client'

import { useEffect, useState } from 'react'
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api'
import { api } from '@/services/api'

const center = { lat: 6.9271, lng: 79.8612 } // Colombo center

interface FloodMarker {
  _id: string
  title: string
  description: string
  severity: 'low' | 'medium' | 'high'
  location: {
    lat: number
    lng: number
  }
  createdAt: string
}

interface ShelterMarker {
  _id: string
  name: string
  capacity: number
  facilities: string
  contact: string
  location: {
    lat: number
    lng: number
  }
  createdAt: string
}

type SelectedMarker = (FloodMarker | ShelterMarker) & { type: 'flood' | 'shelter' }

export default function FloodShelterMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  })

  const [floods, setFloods] = useState<FloodMarker[]>([])
  const [shelters, setShelters] = useState<ShelterMarker[]>([])
  const [selected, setSelected] = useState<SelectedMarker | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [floodsRes, sheltersRes] = await Promise.all([
          api.get('/floods'),
          api.get('/shelters'),
        ])
        setFloods(floodsRes.data)
        setShelters(sheltersRes.data)
        setLastUpdate(new Date())
      } catch (error) {
        console.error('Error fetching map data:', error)
      }
    }

    fetchData()

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loadError) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 text-lg">Error loading Google Maps</p>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin text-4xl mb-4">🗺️</div>
        <p className="text-gray-600">Loading Maps...</p>
      </div>
    )
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
      case 'medium':
        return 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
      default:
        return 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    }
  }

  return (
    <div className="relative w-full h-full">
      {/* Map Legend & Last Update */}
      <div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-lg p-4 space-y-3">
        <div>
          <h3 className="font-bold text-sm mb-2">Map Legend</h3>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>High Severity Flood</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Medium Severity Flood</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Low Severity Flood</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Emergency Shelter</span>
            </div>
          </div>
        </div>
        <div className="pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-600">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Auto-refreshes every 30s
          </p>
        </div>
        <div className="pt-2 border-t border-gray-200">
          <p className="text-xs font-medium">
            📍 {floods.length} Flood zones | 🏠 {shelters.length} Shelters
          </p>
        </div>
      </div>

      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        zoom={10}
        center={center}
        options={{
          streetViewControl: false,
          mapTypeControl: true,
          fullscreenControl: true,
        }}
      >
        {/* Flood Markers */}
        {floods.map(flood => (
          <Marker
            key={flood._id}
            position={flood.location}
            icon={{
              url: getSeverityColor(flood.severity),
            }}
            onClick={() => setSelected({ ...flood, type: 'flood' })}
          />
        ))}

        {/* Shelter Markers */}
        {shelters.map(shelter => (
          <Marker
            key={shelter._id}
            position={shelter.location}
            icon={{
              url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
            }}
            onClick={() => setSelected({ ...shelter, type: 'shelter' })}
          />
        ))}

        {/* Info Window */}
        {selected && (
          <InfoWindow
            position={selected.location}
            onCloseClick={() => setSelected(null)}
          >
            <div className="p-2 max-w-xs">
              {selected.type === 'flood' ? (
                <>
                  <h2 className="font-bold text-lg mb-2">{(selected as FloodMarker).title}</h2>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Severity:</span>{' '}
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          (selected as FloodMarker).severity === 'high'
                            ? 'bg-red-100 text-red-800'
                            : (selected as FloodMarker).severity === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {(selected as FloodMarker).severity.toUpperCase()}
                      </span>
                    </p>
                    <p className="text-gray-700">{(selected as FloodMarker).description}</p>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="font-bold text-lg mb-2">🏠 {(selected as ShelterMarker).name}</h2>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Capacity:</span> {(selected as ShelterMarker).capacity} people
                    </p>
                    <p>
                      <span className="font-medium">Facilities:</span> {(selected as ShelterMarker).facilities}
                    </p>
                    <p>
                      <span className="font-medium">Contact:</span> {(selected as ShelterMarker).contact}
                    </p>
                  </div>
                </>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  )
}

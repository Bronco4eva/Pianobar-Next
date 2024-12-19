'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function QueueDisplay() {
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data, error } = await supabase
          .from('requests')
          .select('*')
          .order('created_at', { ascending: true })

        if (error) throw error
        setRequests(data || [])
      } catch (error) {
        console.error('Error fetching requests:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()

    // Set up real-time subscription
    const subscription = supabase
      .channel('requests')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'requests' 
      }, payload => {
        console.log('Change received!', payload)
        fetchRequests()
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  if (loading) return <div>Loading requests...</div>

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Current Queue</h2>
      {requests.length === 0 ? (
        <p>No requests in queue</p>
      ) : (
        <ul className="divide-y">
          {requests.map((request) => (
            <li key={request.id} className="py-4">
              <p className="font-medium">{request.song_title}</p>
              <p className="text-sm text-gray-500">{request.requester_name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
} 
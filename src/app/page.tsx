'use client'

import Image from "next/image";
import Link from "next/link";
import QueueDisplay from "@/components/queue/QueueDisplay";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    songTitle1: '',
    songTitle2: '',
    name: '',
    dedication: '',
    tipAmount: 0
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('song_requests')
        .insert([
          {
            song_title: formData.songTitle1,
            requested_by: formData.name,
            dedication: formData.dedication || null,
            tip_amount: formData.tipAmount,
            status: 'pending'
          }
        ])

      if (error) throw error

      if (formData.songTitle2) {
        await supabase
          .from('song_requests')
          .insert([
            {
              song_title: formData.songTitle2,
              requested_by: formData.name,
              dedication: formData.dedication || null,
              tip_amount: 0, // Second song doesn't get additional tip
              status: 'pending'
            }
          ])
      }

      // Reset form
      setFormData({
        songTitle1: '',
        songTitle2: '',
        name: '',
        dedication: '',
        tipAmount: 0
      })
    } catch (error) {
      console.error('Error submitting request:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <Image
          src="/Keyed Up entertainment Logo Alpha.png"
          alt="Keyed Up Entertainment"
          width={150}
          height={150}
          className="mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">test 2</h1>
        <p className="text-gray-600">Let's get the party started, request a song below!</p>
      </header>

      <main>
        <QueueDisplay />

        <div className="mt-8">
          <h2 className="flex items-center text-xl font-bold mb-4">
            <span className="mr-2">📝</span> Request a Song
          </h2>
          
          <div className="mb-4">
            <button className="text-[#c17f45] border border-[#c17f45] rounded px-4 py-2 text-sm">
              Song Help
            </button>
            <p className="text-sm text-gray-600 mt-2">Can't think of a song? Click Song Help for suggestions!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1">Song Request 1 (Required) *</label>
              <input
                type="text"
                name="songTitle1"
                value={formData.songTitle1}
                onChange={handleChange}
                placeholder="Enter song title"
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Song Request 2 (Optional)</label>
              <input
                type="text"
                name="songTitle2"
                value={formData.songTitle2}
                onChange={handleChange}
                placeholder="Enter song title"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Your Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Let us know if you're celebrating or have a dedication!</label>
              <textarea
                name="dedication"
                value={formData.dedication}
                onChange={handleChange}
                placeholder="Optional message"
                className="w-full p-2 border rounded"
                rows={4}
              />
            </div>

            <div>
              <label className="block mb-1">Tip Amount (Optional)</label>
              <div className="flex items-center justify-between mb-2">
                <span>$0</span>
                <span>$100</span>
              </div>
              <input
                type="range"
                name="tipAmount"
                value={formData.tipAmount}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#c17f45] text-white py-3 rounded hover:bg-[#a06937] transition disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        </div>
      </main>

      <footer className="mt-8 text-right">
        <Link href="/login" className="text-[#c17f45] hover:underline">
          Pianist Login
        </Link>
      </footer>
    </div>
  );
}

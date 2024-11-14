"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, Download, FileAudio, Cpu, FileDown } from 'lucide-react'

export default function LandingPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setUploadedFile(file)
    setProgress(0)
    setIsProcessing(false)
    
    if (file) {
      setIsProcessing(true)
      // Simulating processing time
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval)
            setIsProcessing(false)
            return 100
          }
          return prevProgress + 10
        })
      }, 500)
    }
  }

  return (
    <div className="min-h-screen bg-[#F0F0FF] text-[#2C0735] flex flex-col">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Source+Sans+Pro:wght@400;600&display=swap');
      `}</style>
      <div className="container mx-auto px-4 py-16 flex-grow">
        <h1 className="text-5xl font-bold mb-6 font-oswald text-center">Bleep It Out</h1>
        <p className="text-xl mb-12 font-sans-pro text-center max-w-2xl mx-auto">
          Instantly clean up your audio files without uploading them to any server. 
          Perfect for podcast editors, content creators, or anyone needing family-friendly audio.
        </p>
        
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl mx-auto mb-16">
          <div className="flex flex-col items-center space-y-6">
            <Button 
              onClick={() => document.getElementById('fileInput')?.click()} 
              className="bg-[#613DC1] hover:bg-[#4E148C] text-white font-bold py-4 px-8 rounded-md text-lg flex items-center space-x-2"
            >
              <Upload className="w-6 h-6" />
              <span>Bleep It Out!</span>
            </Button>
            <input
              id="fileInput"
              type="file"
              accept="audio/mp3,audio/wav,audio/m4a"
              className="hidden"
              onChange={handleFileUpload}
            />
            {uploadedFile && (
              <p className="text-sm text-green-600 font-sans-pro">
                File uploaded: {uploadedFile.name}
              </p>
            )}
            <p className="text-sm text-gray-600 font-sans-pro">
              Supported formats: MP3, WAV, M4A (up to 50MB)
            </p>
            
            {isProcessing && (
              <div className="w-full space-y-2">
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-center font-sans-pro">
                  Processing... {progress}%
                </p>
              </div>
            )}
            
            {progress === 100 && (
              <Button className="bg-[#613DC1] hover:bg-[#4E148C] text-white font-bold py-4 px-8 rounded-md text-lg flex items-center space-x-2">
                <Download className="w-6 h-6" />
                <span>Download Censored Audio</span>
              </Button>
            )}
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <StepCard 
            icon={<FileAudio className="w-12 h-12 text-[#613DC1]" />}
            title="1. Upload"
            description="Upload your audio file and optionally provide a custom word list for censoring. We'll use our default profanity list if you don't provide one."
          />
          <StepCard 
            icon={<Cpu className="w-12 h-12 text-[#613DC1]" />}
            title="2. Process"
            description="We process your file entirely in your browser. No information about your audio or its contents is sent off your machine."
          />
          <StepCard 
            icon={<FileDown className="w-12 h-12 text-[#613DC1]" />}
            title="3. Download"
            description="Get your correctly-censored .wav file ready for immediate download and use."
          />
        </div>
      </div>
      <footer className="bg-[#2C0735] text-white py-4">
        <div className="container mx-auto px-4 text-center font-sans-pro">
          Created with ❤️ by{' '}
          <a 
            href="https://floorboardai.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-[#97DFFC] transition-colors"
          >
            FloorboardAI
          </a>
        </div>
      </footer>
    </div>
  )
}

function StepCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
      {icon}
      <h3 className="text-xl font-bold mt-4 mb-2 font-oswald">{title}</h3>
      <p className="font-sans-pro">{description}</p>
    </div>
  )
}
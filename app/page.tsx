'use client'
import Header from '@/components/Header';
import ExperienceCard from '@/components/ExperienceCard';
import { useAtomValue } from 'jotai';
import { searchExperienceAtom } from '@/atoms/searchExperienceAtom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { backendURI } from '@/URI';
import { toast } from 'sonner';


export type experienceType = {
      id: string,
      destination: string,
      location: string,
      description:string
      price: number,
      image: string,
      slot:any
    }

export default function Home() {
  const [experiences, setExperiences] = useState<experienceType[]>([])
  useEffect(()=>{
    async function getExperiences() {
      try {
        const res = await axios.get(`${backendURI}/experiences`)
        toast("Experiences fetched successfully.")
        setExperiences(res.data.exp)
      } catch (error) {
        toast("Error occurred while fetching experiences. Please Refresh")
      } 
    }
    getExperiences()
  },[])
  
  const experiencesName = useAtomValue(searchExperienceAtom)
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Experience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {experiences.map((exp) => {

            if (exp.destination.toLowerCase().startsWith(experiencesName.toLowerCase())) {
              return <ExperienceCard
                key={exp.id}
                id={exp.id}
                title={exp.destination}
                description={exp.description}
                location={exp.location}
                price={exp.price}
                image={exp.image}
              />

            }
          }
          )}
        </div>
      </main>
    </div>
  );
}

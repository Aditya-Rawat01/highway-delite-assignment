'use client'
import Header from '@/components/Header';
import ExperienceCard from '@/components/ExperienceCard';
import { useAtomValue } from 'jotai';
import { searchExperienceAtom } from '@/atoms/searchExperienceAtom';

export default function Home() {
  const experiences = [
    {
      id: '1',
      title: 'Kayaking',
      location: 'Udupi',
      price: '999',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
      highlighted: true,
      tag: 'Rohit Kumar'
    },
    {
      id: '2',
      title: 'Nandi Hills Sunrise',
      location: 'Bangalore',
      price: '899',
      image: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=400&h=300&fit=crop'
    },
    {
      id: '3',
      title: 'Phoenix Coffee Trail',
      location: 'Coorg',
      price: '1299',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      tag: 'Neha Patange'
    },
    {
      id: '4',
      title: 'Kayaking',
      location: 'Udupi, Karnataka',
      price: '999',
      image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400&h=300&fit=crop'
    },
    {
      id: '5',
      title: 'Nandi Hills Sunrise',
      location: 'Bangalore',
      price: '899',
      image: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=400&h=300&fit=crop'
    },
    {
      id: '6',
      title: 'Boat Cruise',
      location: 'Sunderban',
      price: '999',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop'
    },
    {
      id: '7',
      title: 'Bunjee Jumping',
      location: 'Manali',
      price: '999',
      image: 'https://images.unsplash.com/photo-1534850336045-c6c6d287f89e?w=400&h=300&fit=crop',
      highlighted: true
    },
    {
      id: '8',
      title: 'Coffee Trail',
      location: 'Coorg',
      price: '1299',
      image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=300&fit=crop'
    }
  ];
  const experiencesName = useAtomValue(searchExperienceAtom)
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Experience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp) => {

            if (exp.title.toLowerCase().startsWith(experiencesName.toLowerCase())) {
              return <ExperienceCard
                key={exp.id}
                id={exp.id}
                title={exp.title}
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

import { useState } from 'react';
import { Search, Filter, Star } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { SkillTag } from './ui/SkillTag';

const skillListings = [
  {
    id: 1,
    name: 'Sarah Chen',
    avatar: '👩‍💻',
    university: 'MIT',
    major: 'Computer Science',
    offeredSkills: ['Machine Learning', 'TensorFlow', 'Python'],
    neededSkills: ['React', 'UI Design'],
    rating: 4.9,
    completedExchanges: 15,
  },
  {
    id: 2,
    name: 'Mike Johnson',
    avatar: '👨‍🎓',
    university: 'UCLA',
    major: 'Film Production',
    offeredSkills: ['Video Editing', 'Adobe Premiere', 'After Effects'],
    neededSkills: ['Python', 'Web Development'],
    rating: 4.7,
    completedExchanges: 12,
  },
  {
    id: 3,
    name: 'Emma Wilson',
    avatar: '👩‍🔬',
    university: 'Georgia Tech',
    major: 'Cloud Computing',
    offeredSkills: ['AWS', 'Docker', 'DevOps'],
    neededSkills: ['UI Design', 'Figma'],
    rating: 4.8,
    completedExchanges: 18,
  },
  {
    id: 4,
    name: 'David Lee',
    avatar: '👨‍🎨',
    university: 'NYU',
    major: 'Digital Arts',
    offeredSkills: ['Graphic Design', 'Illustration', 'Photoshop'],
    neededSkills: ['JavaScript', 'React'],
    rating: 4.6,
    completedExchanges: 10,
  },
  {
    id: 5,
    name: 'Lisa Rodriguez',
    avatar: '👩‍💼',
    university: 'UC Berkeley',
    major: 'Business Analytics',
    offeredSkills: ['Data Analysis', 'Excel', 'Tableau'],
    neededSkills: ['Machine Learning', 'Python'],
    rating: 4.9,
    completedExchanges: 20,
  },
  {
    id: 6,
    name: 'James Park',
    avatar: '👨‍🔧',
    university: 'Carnegie Mellon',
    major: 'Robotics',
    offeredSkills: ['Arduino', 'C++', '3D Printing'],
    neededSkills: ['Web Development', 'JavaScript'],
    rating: 4.7,
    completedExchanges: 9,
  },
];

export function SkillFeed() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'matches'>('all');

  const filteredListings = skillListings.filter((listing) => {
    const matchesSearch =
      searchQuery === '' ||
      listing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.offeredSkills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Skill Feed</h1>
        <p className="text-gray-600">
          Discover students and the skills they offer
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search by name or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex space-x-2">
          <Button
            variant={selectedFilter === 'all' ? 'primary' : 'outline'}
            onClick={() => setSelectedFilter('all')}
          >
            All Skills
          </Button>
          <Button
            variant={selectedFilter === 'matches' ? 'primary' : 'outline'}
            onClick={() => setSelectedFilter('matches')}
          >
            <Filter className="w-4 h-4 mr-2" />
            Matches
          </Button>
        </div>
      </div>

      {/* Skill Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredListings.map((listing) => (
          <Card key={listing.id} className="hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-3xl shadow-md">
                  {listing.avatar}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      {listing.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {listing.major} • {listing.university}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium text-gray-700">
                      {listing.rating}
                    </span>
                  </div>
                </div>

                {/* Skills Offered */}
                <div className="mb-3">
                  <p className="text-xs font-medium text-gray-600 mb-1.5">
                    Offers:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {listing.offeredSkills.map((skill) => (
                      <SkillTag
                        key={skill}
                        skill={skill}
                        variant="offer"
                        size="sm"
                      />
                    ))}
                  </div>
                </div>

                {/* Skills Needed */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-600 mb-1.5">
                    Needs:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {listing.neededSkills.map((skill) => (
                      <SkillTag
                        key={skill}
                        skill={skill}
                        variant="need"
                        size="sm"
                      />
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    {listing.completedExchanges} completed exchanges
                  </span>
                  <Button size="sm">Send Request</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

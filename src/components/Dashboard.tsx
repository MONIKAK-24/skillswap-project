import { ArrowRight, TrendingUp, Users, BookOpen } from 'lucide-react';
import { SkillTag } from './ui/SkillTag';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface DashboardProps {
  onNavigate: (screen: 'feed' | 'profile' | 'requests') => void;
}

const myOfferedSkills = ['React', 'Python', 'UI Design', 'Photography'];
const myNeededSkills = ['Machine Learning', 'AWS', 'Video Editing'];
const matchedSuggestions = [
  {
    id: 1,
    name: 'Sarah Chen',
    avatar: '👩‍💻',
    offers: 'Machine Learning',
    needs: 'React',
    matchScore: 95,
  },
  {
    id: 2,
    name: 'Mike Johnson',
    avatar: '👨‍🎓',
    offers: 'Video Editing',
    needs: 'Python',
    matchScore: 88,
  },
  {
    id: 3,
    name: 'Emma Wilson',
    avatar: '👩‍🔬',
    offers: 'AWS',
    needs: 'UI Design',
    matchScore: 82,
  },
];

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, Alex! 👋
        </h1>
        <p className="text-gray-600">
          You have 3 new skill matches and 2 pending requests
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">Active Exchanges</p>
              <p className="text-3xl font-bold">5</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-none">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-1">Skills Learned</p>
              <p className="text-3xl font-bold">12</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-400 to-purple-400 text-white border-none">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/90 text-sm mb-1">Connections</p>
              <p className="text-3xl font-bold">28</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Skills Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              Skills I Offer
            </h2>
            <button
              onClick={() => onNavigate('profile')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Edit
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {myOfferedSkills.map((skill) => (
              <SkillTag key={skill} skill={skill} variant="offer" />
            ))}
            <button
              onClick={() => onNavigate('profile')}
              className="px-3 py-1.5 rounded-lg border-2 border-dashed border-gray-300 text-gray-500 text-sm hover:border-blue-400 hover:text-blue-600 transition-colors"
            >
              + Add Skill
            </button>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              Skills I Need
            </h2>
            <button
              onClick={() => onNavigate('profile')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Edit
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {myNeededSkills.map((skill) => (
              <SkillTag key={skill} skill={skill} variant="need" />
            ))}
            <button
              onClick={() => onNavigate('profile')}
              className="px-3 py-1.5 rounded-lg border-2 border-dashed border-gray-300 text-gray-500 text-sm hover:border-purple-400 hover:text-purple-600 transition-colors"
            >
              + Add Skill
            </button>
          </div>
        </Card>
      </div>

      {/* Matched Suggestions */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Perfect Matches for You
            </h2>
            <p className="text-sm text-gray-600">
              Students who need what you offer and can teach what you need
            </p>
          </div>
          <Button variant="outline" onClick={() => onNavigate('feed')}>
            View All
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="space-y-4">
          {matchedSuggestions.map((match) => (
            <div
              key={match.id}
              className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all bg-gradient-to-r from-white to-blue-50/30"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="text-4xl">{match.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-bold text-gray-900">{match.name}</h3>
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                        {match.matchScore}% match
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600">Offers:</span>
                        <SkillTag skill={match.offers} variant="offer" size="sm" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600">Needs:</span>
                        <SkillTag skill={match.needs} variant="need" size="sm" />
                      </div>
                    </div>
                  </div>
                </div>
                <Button onClick={() => onNavigate('requests')}>
                  Connect
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

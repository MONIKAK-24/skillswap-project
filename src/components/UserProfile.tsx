import { useState } from 'react';
import { Edit2, Mail, GraduationCap, MapPin, Save, X } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { SkillTag } from './ui/SkillTag';

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Morgan',
    email: 'alex.morgan@university.edu',
    university: 'Stanford University',
    major: 'Computer Science',
    year: 'Junior',
    location: 'Palo Alto, CA',
    bio: 'Passionate about web development and design. Love helping others learn to code!',
  });

  const [offeredSkills, setOfferedSkills] = useState([
    'React',
    'Python',
    'UI Design',
    'Photography',
  ]);

  const [neededSkills, setNeededSkills] = useState([
    'Machine Learning',
    'AWS',
    'Video Editing',
  ]);

  const [newSkill, setNewSkill] = useState('');

  const handleSave = () => {
    setIsEditing(false);
  };

  const addSkill = (type: 'offer' | 'need') => {
    if (!newSkill.trim()) return;
    
    if (type === 'offer') {
      setOfferedSkills([...offeredSkills, newSkill.trim()]);
    } else {
      setNeededSkills([...neededSkills, newSkill.trim()]);
    }
    setNewSkill('');
  };

  const removeSkill = (skill: string, type: 'offer' | 'need') => {
    if (type === 'offer') {
      setOfferedSkills(offeredSkills.filter((s) => s !== skill));
    } else {
      setNeededSkills(neededSkills.filter((s) => s !== skill));
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-5xl shadow-lg">
              👨‍💻
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            {isEditing ? (
              <>
                <Input
                  label="Name"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="University"
                    value={profile.university}
                    onChange={(e) =>
                      setProfile({ ...profile, university: e.target.value })
                    }
                  />
                  <Input
                    label="Major"
                    value={profile.major}
                    onChange={(e) =>
                      setProfile({ ...profile, major: e.target.value })
                    }
                  />
                  <Input
                    label="Year"
                    value={profile.year}
                    onChange={(e) =>
                      setProfile({ ...profile, year: e.target.value })
                    }
                  />
                  <Input
                    label="Location"
                    value={profile.location}
                    onChange={(e) =>
                      setProfile({ ...profile, location: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {profile.name}
                  </h2>
                  <p className="text-gray-600">{profile.bio}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{profile.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <GraduationCap className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">
                      {profile.major} • {profile.year}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{profile.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <GraduationCap className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{profile.university}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Skills Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Offered Skills */}
        <Card>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Skills I Offer
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {offeredSkills.map((skill) => (
              <div key={skill} className="relative group">
                <SkillTag skill={skill} variant="offer" />
                {isEditing && (
                  <button
                    onClick={() => removeSkill(skill, 'offer')}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          {isEditing && (
            <div className="flex space-x-2">
              <Input
                placeholder="Add a skill..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addSkill('offer');
                  }
                }}
              />
              <Button onClick={() => addSkill('offer')}>Add</Button>
            </div>
          )}
        </Card>

        {/* Needed Skills */}
        <Card>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Skills I Need
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {neededSkills.map((skill) => (
              <div key={skill} className="relative group">
                <SkillTag skill={skill} variant="need" />
                {isEditing && (
                  <button
                    onClick={() => removeSkill(skill, 'need')}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          {isEditing && (
            <div className="flex space-x-2">
              <Input
                placeholder="Add a skill..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addSkill('need');
                  }
                }}
              />
              <Button onClick={() => addSkill('need')}>Add</Button>
            </div>
          )}
        </Card>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <Card className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-1">24</div>
          <div className="text-sm text-gray-600">Skills Taught</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-purple-600 mb-1">12</div>
          <div className="text-sm text-gray-600">Skills Learned</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-1">4.8</div>
          <div className="text-sm text-gray-600">Rating</div>
        </Card>
      </div>
    </div>
  );
}

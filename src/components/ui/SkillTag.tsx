interface SkillTagProps {
  skill: string;
  variant: 'offer' | 'need';
  size?: 'sm' | 'md';
}

export function SkillTag({ skill, variant, size = 'md' }: SkillTagProps) {
  const variants = {
    offer: 'bg-blue-100 text-blue-700 border-blue-200',
    need: 'bg-purple-100 text-purple-700 border-purple-200',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-lg border ${variants[variant]} ${sizes[size]}`}
    >
      {skill}
    </span>
  );
}

import React from 'react';
import { Code, Palette, Zap, Users } from 'lucide-react';

const About: React.FC = () => {
  const skills = [
    { category: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript'] },
    { category: 'Dizayn', items: ['Tailwind CSS', 'Bootstrap', 'Responsive Design', 'CSS Grid', 'Flexbox'] },
    { category: 'Vositalar', items: ['Git', 'VS Code', 'Figma', 'npm', 'Vite'] },
  ];

  const features = [
    {
      icon: Code,
      title: 'Toza Kod',
      description: 'Samarali va tushunarli kod yozish, eng yaxshi amaliyotlarga rioya qilish.',
    },
    {
      icon: Palette,
      title: 'UI/UX Dizayn',
      description: 'Chiroyli va qulay foydalanuvchi interfeyslari yaratish.',
    },
    {
      icon: Zap,
      title: 'Tez Ishlash',
      description: 'Ilovalarni tezlik va mukammal foydalanuvchi tajribasi uchun optimallashtirish.',
    },
    {
      icon: Users,
      title: 'Hamkorlik',
      description: 'Jamoalar bilan samarali ishlash va natijalarni yetkazish.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Men Haqimda
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Men ishtiyoqli frontend dasturchiman. iTech Academy'da 1 yil 2 oy ta'lim oldim va 
            2 oylik amaliyot kursini muvaffaqiyatli tugatdim. Zamonaviy veb-texnologiyalar bilan ishlashni yaxshi bilaman.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div className="w-full h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Code size={48} className="text-white" />
                </div>
                <p className="text-gray-400">Profil Rasmi</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Men tez, qulay va chiroyli veb-ilovalar yaratishga ixtisoslashganman. Mening maqsadim 
              har doim foydalanuvchilar uchun silliq va qiziqarli tajriba taqdim etuvchi ilovalar yaratishdir.
            </p>
            
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Dasturlash bilan band bo'lmaganimda, yangi texnologiyalarni o'rganish, loyihalar ustida 
              ishlash yoki dasturchilar jamiyati bilan bilim almashish bilan shug'ullanaman.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="bg-gray-800 p-4 rounded-xl text-center hover:bg-gray-700 transition-colors duration-300"
                >
                  <feature.icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <h3 className="text-sm font-semibold text-gray-200">{feature.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((skillGroup, index) => (
            <div
              key={skillGroup.category}
              className="bg-gray-800 p-6 rounded-2xl hover:bg-gray-750 transition-colors duration-300"
            >
              <h3 className="text-xl font-bold text-white mb-4">{skillGroup.category}</h3>
              <div className="space-y-2">
                {skillGroup.items.map((skill) => (
                  <div
                    key={skill}
                    className="bg-gray-700 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-600 transition-colors duration-200"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
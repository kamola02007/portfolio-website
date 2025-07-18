import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'Fake E-Commerce',
      description: 'React va TypeScript yordamida yaratilgan zamonaviy onlayn do\'kon. To\'liq funksional e-commerce platformasi responsive dizayn bilan.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'JavaScript'],
      githubUrl: '#',
      liveUrl: 'https://fakee-commerce.netlify.app/',
    },
    {
      title: 'Weather App',
      description: 'Ob-havo ma\'lumotlarini real vaqtda ko\'rsatuvchi zamonaviy ilova. API integratsiyasi va chiroyli animatsiyalar bilan.',
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['JavaScript', 'HTML', 'CSS', 'API'],
      githubUrl: '#',
      liveUrl: 'https://weatherrrrrapp.netlify.app/',
    },
    {
      title: 'Pizza Figma Design',
      description: 'Figma dizaynidan kodga o\'tkazilgan pizza buyurtma sayti. Pixel-perfect implementatsiya va responsive dizayn.',
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Figma'],
      githubUrl: '#',
      liveUrl: 'https://kamola-pizzafigma.netlify.app/',
    },
    {
      title: 'Portfolio Veb-sayti',
      description: 'Shaxsiy portfolio sayti zamonaviy dizayn va animatsiyalar bilan. React va Tailwind CSS yordamida yaratilgan professional ko\'rinish.',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Responsive Design'],
      githubUrl: '#',
      liveUrl: window.location.href,
    },
  ];

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Asosiy Loyihalar
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Mening frontend dasturlash ko'nikmalarimni va kreativ yechimlarimni 
            namoyish etuvchi loyihalar to'plami.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="bg-gray-800 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <a
                    href={project.githubUrl}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <Github size={20} />
                    <span>Kod</span>
                  </a>
                  <a
                    href={project.liveUrl}
                    className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    <ExternalLink size={20} />
                    <span>Jonli Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
            Barcha Loyihalarni Ko'rish
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
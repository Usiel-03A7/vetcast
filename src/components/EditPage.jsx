import { useState } from 'react';
import { FiEye, FiSave, FiImage, FiLayout, FiType, FiSettings, FiX } from 'react-icons/fi';

const EditPage = () => {
  const [pageData, setPageData] = useState({
    title: 'VetCast Veterinaria',
    description: 'Clínica veterinaria especializada en cuidado animal',
    primaryColor: '#3b82f6', // blue-500
    secondaryColor: '#1d4ed8', // blue-700
    logo: null,
    sections: [
      {
        id: 1,
        type: 'hero',
        content: 'Bienvenidos a nuestra clínica veterinaria',
        visible: true
      },
      {
        id: 2,
        type: 'services',
        content: 'Consultas, Vacunación, Cirugías',
        visible: true
      }
    ]
  });

  const [previewMode, setPreviewMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPageData(prev => ({ ...prev, [name]: value }));
  };

  const handleSectionChange = (id, field, value) => {
    setPageData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === id ? { ...section, [field]: value } : section
      )
    }));
  };

  const handleSave = () => {
    console.log('Página guardada:', pageData);
    // Aquí iría la lógica para guardar en Firebase
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FiLayout className="text-blue-600" />
            Editor de Página
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200"
            >
              <FiEye />
              {previewMode ? 'Modo Edición' : 'Vista Previa'}
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <FiSave />
              Guardar Cambios
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel de edición */}
          {!previewMode && (
            <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow border border-gray-200">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FiSettings />
                Configuración General
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título de la Página
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={pageData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    name="description"
                    value={pageData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Color Primario
                    </label>
                    <input
                      type="color"
                      name="primaryColor"
                      value={pageData.primaryColor}
                      onChange={handleChange}
                      className="w-full h-10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Color Secundario
                    </label>
                    <input
                      type="color"
                      name="secondaryColor"
                      value={pageData.secondaryColor}
                      onChange={handleChange}
                      className="w-full h-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <FiImage />
                    Logo
                  </label>
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          setPageData(prev => ({ ...prev, logo: event.target.result }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </div>

              <h2 className="text-lg font-semibold mt-8 mb-4 flex items-center gap-2">
                <FiLayout />
                Secciones
              </h2>
              
              <div className="space-y-4">
                {pageData.sections.map(section => (
                  <div key={section.id} className="p-4 border border-gray-200 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium capitalize">{section.type}</h3>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={section.visible}
                          onChange={(e) => handleSectionChange(section.id, 'visible', e.target.checked)}
                          className="rounded text-blue-600"
                        />
                        <span className="ml-2 text-sm text-gray-600">Visible</span>
                      </label>
                    </div>
                    {section.type === 'hero' && (
                      <textarea
                        value={section.content}
                        onChange={(e) => handleSectionChange(section.id, 'content', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        rows="2"
                      />
                    )}
                    {section.type === 'services' && (
                      <input
                        type="text"
                        value={section.content}
                        onChange={(e) => handleSectionChange(section.id, 'content', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Vista previa */}
          <div className={`${previewMode ? 'lg:col-span-3' : 'lg:col-span-2'} bg-white p-6 rounded-lg shadow border border-gray-200`}>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FiEye />
              Vista Previa
            </h2>
            
            <div className="border rounded-lg overflow-hidden" style={{ minHeight: '500px' }}>
              {/* Header */}
              <header 
                className="p-4 flex justify-between items-center"
                style={{ backgroundColor: pageData.primaryColor }}
              >
                <div className="flex items-center">
                  {pageData.logo && (
                    <img 
                      src={pageData.logo} 
                      alt="Logo" 
                      className="h-10 mr-3"
                    />
                  )}
                  <h1 
                    className="text-xl font-bold"
                    style={{ color: 'white' }}
                  >
                    {pageData.title}
                  </h1>
                </div>
                <nav>
                  <ul className="flex space-x-4">
                    <li><a href="#" className="text-white hover:underline">Inicio</a></li>
                    <li><a href="#" className="text-white hover:underline">Servicios</a></li>
                    <li><a href="#" className="text-white hover:underline">Contacto</a></li>
                  </ul>
                </nav>
              </header>

              {/* Contenido */}
              <main className="p-6">
                {pageData.sections.filter(s => s.visible).map(section => (
                  <section 
                    key={section.id} 
                    className={`mb-8 p-6 rounded-lg ${section.type === 'hero' ? 'bg-gray-100' : ''}`}
                  >
                    {section.type === 'hero' && (
                      <div className="text-center py-12">
                        <h2 
                          className="text-3xl font-bold mb-4"
                          style={{ color: pageData.secondaryColor }}
                        >
                          {section.content}
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                          {pageData.description}
                        </p>
                      </div>
                    )}

                    {section.type === 'services' && (
                      <div>
                        <h2 
                          className="text-2xl font-semibold mb-4"
                          style={{ color: pageData.secondaryColor }}
                        >
                          Nuestros Servicios
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {section.content.split(',').map((service, i) => (
                            <div key={i} className="p-4 border rounded-lg">
                              <h3 className="font-medium">{service.trim()}</h3>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </section>
                ))}
              </main>

              {/* Footer */}
              <footer 
                className="p-4 text-center text-white"
                style={{ backgroundColor: pageData.secondaryColor }}
              >
                <p>© {new Date().getFullYear()} {pageData.title}. Todos los derechos reservados.</p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;

export interface AffiliateLocation {
   lat: number;
   lng: number;
   address: string;
   city: string;
   state: string;
   postalCode: string;
}

export interface Affiliate {
   id: string;
   name: string;
   type: 'clinic' | 'pharmacy';
   description: string;
   phone: string;
   email: string;
   website?: string;
   location: AffiliateLocation;
   services: string[];
   operatingHours: {
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
      sunday: string;
   };
   rating: number;
   verified: boolean;
   specialties?: string[];
   acceptsInsurance: boolean;
}

export const mockAffiliates: Affiliate[] = [
   {
      id: '1',
      name: 'Centro de Diálisis San Rafael',
      type: 'clinic',
      description: 'Centro especializado en hemodiálisis con tecnología de última generación y personal altamente capacitado.',
      phone: '+52 55 1234 5678',
      email: 'contacto@sanrafael.mx',
      website: 'https://sanrafael.mx',
      location: {
         lat: 19.4326,
         lng: -99.1332,
         address: 'Av. Insurgentes Sur 1234',
         city: 'Ciudad de México',
         state: 'CDMX',
         postalCode: '03100'
      },
      services: ['Hemodiálisis', 'Diálisis peritoneal', 'Consulta nefrológica', 'Laboratorio'],
      operatingHours: {
         monday: '6:00 AM - 10:00 PM',
         tuesday: '6:00 AM - 10:00 PM',
         wednesday: '6:00 AM - 10:00 PM',
         thursday: '6:00 AM - 10:00 PM',
         friday: '6:00 AM - 10:00 PM',
         saturday: '8:00 AM - 6:00 PM',
         sunday: '8:00 AM - 2:00 PM'
      },
      rating: 4.8,
      verified: true,
      specialties: ['Nefrología', 'Cardionefrología', 'Trasplante renal'],
      acceptsInsurance: true
   },
   {
      id: '2',
      name: 'Farmacia del Ahorro - Sucursal Roma Norte',
      type: 'pharmacy',
      description: 'Farmacia con amplio surtido de medicamentos especializados para pacientes renales y descuentos especiales.',
      phone: '+52 55 2345 6789',
      email: 'roma.norte@farmaciadelahorro.mx',
      website: 'https://farmaciadelahorro.mx',
      location: {
         lat: 19.4150,
         lng: -99.1650,
         address: 'Av. Álvaro Obregón 45',
         city: 'Ciudad de México',
         state: 'CDMX',
         postalCode: '06700'
      },
      services: ['Medicamentos especializados', 'Consulta farmacéutica', 'Entrega a domicilio', 'Programa de descuentos'],
      operatingHours: {
         monday: '7:00 AM - 11:00 PM',
         tuesday: '7:00 AM - 11:00 PM',
         wednesday: '7:00 AM - 11:00 PM',
         thursday: '7:00 AM - 11:00 PM',
         friday: '7:00 AM - 11:00 PM',
         saturday: '8:00 AM - 10:00 PM',
         sunday: '9:00 AM - 9:00 PM'
      },
      rating: 4.5,
      verified: true,
      acceptsInsurance: true
   },
   {
      id: '3',
      name: 'Clínica Nefrológica Guadalajara',
      type: 'clinic',
      description: 'Centro de referencia en el occidente del país con más de 20 años de experiencia en tratamientos renales.',
      phone: '+52 33 3456 7890',
      email: 'info@nefrologicagdl.mx',
      website: 'https://nefrologicagdl.mx',
      location: {
         lat: 20.6597,
         lng: -103.3496,
         address: 'Av. López Mateos Norte 2375',
         city: 'Guadalajara',
         state: 'Jalisco',
         postalCode: '44600'
      },
      services: ['Hemodiálisis', 'Diálisis peritoneal', 'Consulta especializada', 'Cirugía de acceso vascular'],
      operatingHours: {
         monday: '5:30 AM - 9:00 PM',
         tuesday: '5:30 AM - 9:00 PM',
         wednesday: '5:30 AM - 9:00 PM',
         thursday: '5:30 AM - 9:00 PM',
         friday: '5:30 AM - 9:00 PM',
         saturday: '7:00 AM - 5:00 PM',
         sunday: 'Cerrado'
      },
      rating: 4.9,
      verified: true,
      specialties: ['Nefrología', 'Urología', 'Cirugía vascular'],
      acceptsInsurance: true
   },
   {
      id: '4',
      name: 'Farmacia San Pablo - Monterrey Centro',
      type: 'pharmacy',
      description: 'Farmacia especializada con servicio 24 horas y amplio stock de medicamentos para pacientes renales.',
      phone: '+52 81 4567 8901',
      email: 'monterrey.centro@sanpablo.mx',
      website: 'https://sanpablo.mx',
      location: {
         lat: 25.6866,
         lng: -100.3161,
         address: 'Av. Hidalgo 1502 Pte',
         city: 'Monterrey',
         state: 'Nuevo León',
         postalCode: '64000'
      },
      services: ['Medicamentos especializados', 'Servicio 24 horas', 'Consulta médica', 'Laboratorio clínico'],
      operatingHours: {
         monday: '24 horas',
         tuesday: '24 horas',
         wednesday: '24 horas',
         thursday: '24 horas',
         friday: '24 horas',
         saturday: '24 horas',
         sunday: '24 horas'
      },
      rating: 4.6,
      verified: true,
      acceptsInsurance: true
   },
   {
      id: '5',
      name: 'Centro Médico Especializado Puebla',
      type: 'clinic',
      description: 'Clínica multiespecialidad con unidad de nefrología y diálisis de alta calidad.',
      phone: '+52 222 567 8901',
      email: 'contacto@cmepuebla.mx',
      location: {
         lat: 19.0414,
         lng: -98.2063,
         address: 'Blvd. Atlixco 1234',
         city: 'Puebla',
         state: 'Puebla',
         postalCode: '72190'
      },
      services: ['Hemodiálisis', 'Consulta nefrológica', 'Estudios de imagen', 'Laboratorio especializado'],
      operatingHours: {
         monday: '6:00 AM - 8:00 PM',
         tuesday: '6:00 AM - 8:00 PM',
         wednesday: '6:00 AM - 8:00 PM',
         thursday: '6:00 AM - 8:00 PM',
         friday: '6:00 AM - 8:00 PM',
         saturday: '8:00 AM - 4:00 PM',
         sunday: 'Cerrado'
      },
      rating: 4.7,
      verified: true,
      specialties: ['Nefrología', 'Cardiología', 'Endocrinología'],
      acceptsInsurance: true
   },
   {
      id: '6',
      name: 'Farmacia Benavides - Tijuana',
      type: 'pharmacy',
      description: 'Farmacia fronteriza con medicamentos especializados y facilidades para pacientes internacionales.',
      phone: '+52 664 678 9012',
      email: 'tijuana@benavides.mx',
      website: 'https://benavides.mx',
      location: {
         lat: 32.5149,
         lng: -117.0382,
         address: 'Av. Revolución 1234',
         city: 'Tijuana',
         state: 'Baja California',
         postalCode: '22000'
      },
      services: ['Medicamentos importados', 'Consulta farmacéutica', 'Envío internacional', 'Programa VIP'],
      operatingHours: {
         monday: '8:00 AM - 10:00 PM',
         tuesday: '8:00 AM - 10:00 PM',
         wednesday: '8:00 AM - 10:00 PM',
         thursday: '8:00 AM - 10:00 PM',
         friday: '8:00 AM - 10:00 PM',
         saturday: '9:00 AM - 9:00 PM',
         sunday: '10:00 AM - 8:00 PM'
      },
      rating: 4.4,
      verified: true,
      acceptsInsurance: true
   },
   {
      id: '7',
      name: 'Instituto de Nefrología de Mérida',
      type: 'clinic',
      description: 'Centro de excelencia en nefrología en la península de Yucatán con tecnología de vanguardia.',
      phone: '+52 999 789 0123',
      email: 'info@nefromerida.mx',
      website: 'https://nefromerida.mx',
      location: {
         lat: 20.9674,
         lng: -89.5926,
         address: 'Calle 60 No. 491A x 57 y 59',
         city: 'Mérida',
         state: 'Yucatán',
         postalCode: '97000'
      },
      services: ['Hemodiálisis', 'Diálisis peritoneal', 'Trasplante renal', 'Investigación clínica'],
      operatingHours: {
         monday: '6:00 AM - 9:00 PM',
         tuesday: '6:00 AM - 9:00 PM',
         wednesday: '6:00 AM - 9:00 PM',
         thursday: '6:00 AM - 9:00 PM',
         friday: '6:00 AM - 9:00 PM',
         saturday: '8:00 AM - 5:00 PM',
         sunday: 'Cerrado'
      },
      rating: 4.8,
      verified: true,
      specialties: ['Nefrología', 'Trasplante renal', 'Medicina interna'],
      acceptsInsurance: true
   },
   {
      id: '8',
      name: 'Farmacia Guadalajara - León',
      type: 'pharmacy',
      description: 'Farmacia con amplia cobertura y especialización en medicamentos para enfermedades crónicas.',
      phone: '+52 477 890 1234',
      email: 'leon@farmaciaguadalajara.mx',
      website: 'https://farmaciaguadalajara.mx',
      location: {
         lat: 21.1619,
         lng: -101.6739,
         address: 'Blvd. López Mateos 2020',
         city: 'León',
         state: 'Guanajuato',
         postalCode: '37000'
      },
      services: ['Medicamentos especializados', 'Consulta médica', 'Laboratorio', 'Programa de fidelidad'],
      operatingHours: {
         monday: '7:00 AM - 11:00 PM',
         tuesday: '7:00 AM - 11:00 PM',
         wednesday: '7:00 AM - 11:00 PM',
         thursday: '7:00 AM - 11:00 PM',
         friday: '7:00 AM - 11:00 PM',
         saturday: '8:00 AM - 10:00 PM',
         sunday: '9:00 AM - 9:00 PM'
      },
      rating: 4.3,
      verified: true,
      acceptsInsurance: true
   }
];

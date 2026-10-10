// Original starter learning content. Expand chapter-by-chapter after checking the current official syllabus.
export const studyContent = {
  'Units and Measurements': {
    subject:'Physics', level:'JEE + NEET',
    notes:[
      ['Physical quantity','A measurable property expressed as a number and a unit. Examples: length, mass, time and speed.'],
      ['SI base units','Length—metre (m), mass—kilogram (kg), time—second (s), electric current—ampere (A), temperature—kelvin (K), amount—mole (mol), luminous intensity—candela (cd).'],
      ['Dimensional formula','Write a quantity in powers of base dimensions. For example, velocity [LT⁻¹], acceleration [LT⁻²], force [MLT⁻²].'],
      ['Measurement errors','Absolute error is the magnitude of the difference from the measured mean; relative error = absolute error / mean value; percentage error = relative error × 100%.'],
      ['Significant figures','They communicate measurement precision. In multiplication/division, the result generally follows the least number of significant figures among measured inputs.']
    ],
    questions:[
      {q:'The dimensional formula of force is:',opts:['[MLT⁻¹]','[MLT⁻²]','[ML²T⁻²]','[M⁰LT⁻²]'],a:1,why:'Force = mass × acceleration, so dimensions are M × LT⁻² = [MLT⁻²].'},
      {q:'The SI unit of thermodynamic temperature is:',opts:['Celsius','Fahrenheit','kelvin','joule'],a:2,why:'Kelvin (K) is the SI base unit for thermodynamic temperature.'},
      {q:'If relative error is 0.02, percentage error is:',opts:['0.02%','0.2%','2%','20%'],a:2,why:'Percentage error = 0.02 × 100 = 2%.'}
    ]
  },
  'Laws of Motion': {
    subject:'Physics',level:'JEE + NEET',
    notes:[
      ['Newton’s first law','An object remains at rest or in uniform straight-line motion unless acted on by a net external force. This is the law of inertia.'],
      ['Newton’s second law','Net force equals the rate of change of momentum. For constant mass, F = ma. The SI unit of force is newton (N).'],
      ['Newton’s third law','For every action there is an equal and opposite reaction. The two forces act on different bodies, so they do not cancel on a single-body free-body diagram.'],
      ['Friction','Static friction adjusts up to a maximum; kinetic friction acts when surfaces slide. In the simple model, fₖ = μₖN.'],
      ['Free-body diagrams','Isolate one object and draw only forces acting on it: weight, normal force, tension, friction and applied forces as relevant.']
    ],
    questions:[
      {q:'A net force of 12 N acts on a 3 kg object. Its acceleration is:',opts:['2 m/s²','3 m/s²','4 m/s²','36 m/s²'],a:2,why:'Using F = ma, a = F/m = 12/3 = 4 m/s².'},
      {q:'Action and reaction forces act on:',opts:['the same body','different bodies','only stationary bodies','only moving bodies'],a:1,why:'Newton’s third-law force pair acts on two different interacting bodies.'},
      {q:'The SI unit of momentum is:',opts:['kg m/s','N/m','kg m/s²','joule'],a:0,why:'Momentum p = mv, so its SI unit is kg·m/s.'}
    ]
  },
  'Structure of Atom': {
    subject:'Chemistry',level:'JEE + NEET',
    notes:[
      ['Subatomic particles','Protons carry +1 charge, electrons −1, and neutrons have zero charge. Atomic number Z equals proton count; mass number A equals protons + neutrons.'],
      ['Isotopes and isobars','Isotopes have the same atomic number but different mass numbers. Isobars have the same mass number but different atomic numbers.'],
      ['Bohr model','For hydrogen-like species, allowed energy levels are quantised. The energy of level n is proportional to −Z²/n²; transitions involve photon absorption or emission.'],
      ['Quantum numbers','Principal n describes shell/energy; azimuthal l describes subshell; magnetic mₗ describes orbital orientation; spin mₛ is +½ or −½.'],
      ['Aufbau, Pauli, Hund','Electrons fill lower-energy orbitals first; an orbital holds at most two electrons with opposite spins; degenerate orbitals are singly occupied with parallel spins before pairing.']
    ],
    questions:[
      {q:'The atomic number of an element equals its number of:',opts:['neutrons','protons','protons + neutrons','energy levels'],a:1,why:'Atomic number Z is defined as the number of protons in the nucleus.'},
      {q:'Two isotopes of the same element differ in their number of:',opts:['protons','neutrons','atomic number','chemical symbol'],a:1,why:'Isotopes share the same proton count but have different neutron counts.'},
      {q:'The maximum number of electrons in one orbital is:',opts:['1','2','6','10'],a:1,why:'The Pauli exclusion principle allows at most two electrons per orbital with opposite spins.'}
    ]
  },
  'Cell: The Unit of Life': {
    subject:'Biology',level:'NEET',
    notes:[
      ['Cell theory','Living organisms are composed of cells; the cell is the basic structural and functional unit; cells arise from pre-existing cells.'],
      ['Prokaryotic vs eukaryotic','Prokaryotes lack a membrane-bound nucleus and typical membrane-bound organelles. Eukaryotes have a true nucleus and compartmentalised organelles.'],
      ['Plasma membrane','A selectively permeable phospholipid bilayer with proteins. The fluid-mosaic model describes mobile lipids and proteins.'],
      ['Mitochondria','Double-membraned organelles where aerobic respiration generates much of the cell’s ATP. They contain their own DNA and ribosomes.'],
      ['Ribosomes and ER','Ribosomes synthesise proteins. Rough ER has ribosomes and helps process proteins; smooth ER is involved in lipid synthesis and other functions.']
    ],
    questions:[
      {q:'Which structure is the main site of aerobic ATP production in eukaryotic cells?',opts:['Golgi apparatus','Mitochondrion','Lysosome','Nucleolus'],a:1,why:'Mitochondria carry out major stages of aerobic respiration and oxidative phosphorylation.'},
      {q:'Which cell type lacks a membrane-bound nucleus?',opts:['Plant cell','Animal cell','Prokaryotic cell','Fungal cell'],a:2,why:'Prokaryotic cells have DNA in a nucleoid region rather than a membrane-bound nucleus.'},
      {q:'Ribosomes are directly involved in:',opts:['protein synthesis','photosynthetic light capture','lipid bilayer formation only','DNA storage'],a:0,why:'Ribosomes translate messenger RNA to assemble polypeptides.'}
    ]
  }
};

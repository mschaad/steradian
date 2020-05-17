define(['Enum'], function(Enum) {
    /*
        from https://physics.nist.gov/cuu/Units/units.html

        =Derived Quantity=      =Name=          =Symbol=    =Exp=   =Expression in base units=
        plane angle 	        radian          rad	        -	    m·m^-1 = 1
        solid angle 	        steradian 	    sr	        -	    m^2·m^-2 = 1
        frequency	            hertz	        Hz	        -	    s^-1
        force	                newton	        N	        -	    m·kg·s^-2
        pressure/stress	        pascal   	    Pa	        N/m^2	m^-1·kg·s^-2
        energy/work             joule	        J	        N·m	    m^2·kg·s^-2
        power/radiant flux	    watt	        W           J/s	    m^2·kg·s^-3
        electric charge 	    coulomb	        C	        -	    s·A
        electric potential difference,
        electromotive force	    volt	        V	        W/A	    m^2·kg·s^-3·A^-1
        capacitance	            farad	        F	        C/V	    m^-2·kg^-1·s^4·A^2
        electric resistance	    ohm	            Ω   	    V/A	    m^2·kg·s^-3·A^-2
        electric conductance    siemens	        S	        A/V	    m^-2·kg^-1·s^3·A^2
        magnetic flux	        weber	        Wb	        V·s	    m^2·kg·s^-2·A^-1
        magnetic flux density	tesla	        T	        Wb/m^2	kg·s^-2·A^-1
        inductance	            henry	        H	        Wb/A	m^2·kg·s^-2·A^-2
        Celsius temperature	    degree Celsius	°C	        -	    K
        luminous flux	        lumen	        lm	        cd·sr	m^2·m^-2·cd = cd
        illuminance	            lux	            lx	        lm/m^2	m^2·m^-4·cd = m^-2·cd
        activity (radionuclide)	becquerel	    Bq	        -	    s^-1
        absorbed dose,
        specific energy (imparted),
        kerma	                gray        	Gy	        J/kg	m^2·s^-2
        dose equivalent (d)	    sievert     	Sv	        J/kg	m^2·s^-2
        catalytic activity	    katal	        kat	            	s^-1·mol
    */

    return Enum.create({
        name: 'DerivedUnitType',
        values: [
            'ENERGY',
            'FORCE'
        ]
    });
});
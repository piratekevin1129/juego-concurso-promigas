var data_preguntas = [
	{
		id:2,
		tipo:'seleccionmultiple',
		pregunta:'¿Cuáles son las etapas de la contratación y sus respectivas pólizas?',
		opciones:[
			'Etapa Precontractual con póliza de Cumplimiento (Seriedad de la oferta)',
			'Etapa Contractual y Etapa Postcontractual con póliza de cumplimiento (cuenta con amparos para ambas etapas) y póliza de Responsabilidad Civil',
			'Etapa Precontractual, Etapa Contractual y Etapa Postcontractua con póliza de Cumplimiento',
			'A y B son correctas'
		],
		retroalimentacion:'<p><span>Correcto.</span>¡Muy bien!.</span> Además es importante tener en cuenta las obligaciones en cada una de las etapas mencionadas, es decir, en la:</p><ul><li><span>Etapa Precontractual:</span> Mantener la oferta, suscribir el contrato y constituir garantías, por ello es importante solicitar póliza de Seriedad de la oferta.</li><li>En la <span>etapa contractual:</span> Usar correctamente el anticipo, cumplir las obligaciones del contrato y pagar obligaciones laborales.</li><li>Y en la <span>etapa postcontractual:</span> Corregir errores o fallas por incumplimientos que causan mala calidad de bienes, servicios y/o estabilidad de las obras.</li></ul><p>Para estas dos últimas etapas es necesario solicitar pólizas de cumplimiento para garantizar que cuenta con amparos para ambas etapas y la póliza de responsabilidad Civil.<br />Recuerda que todas las pólizas recibidas deben ser expedidas por aseguradoras constituidas en Colombia cuya fortaleza financiera sea AAA.</p>',
		audiocorrect:'bien',
		audioincorrect:'mal',
		audiotiempo:'tiempo',
		preguntaaudio:'pregunta',
		opcionesaudio:false,
		correcta:4
	},
	{
		id:1,
		tipo:'verdaderofalso',
		pregunta:'¿Es correcto decir que la mayoría de contratos requieren pólizas?',
		opciones:[
			'Verdadero',
			'Falso'
		],
		retroalimentacion:'<p><span>Correcto.</span> <br />¡La gran mayoría! Dado que nos pueden ocasionar afectación en el patrimonio por:</p><ul><li>Retracto de la oferta</li><li>Incumplimiento de obligaciones contractuales</li><li>Incumplimiento de obligaciones laborales</li><li>Daños a nuestros bienes o de terceros</li><li>Y lesiones personales o muerte de empleados o terceros</li></ul><p>Por lo tanto, antes de celebrar cualquier contrato consulta con el área de seguros.</p>',
		audiocorrect:'bien',
		audioincorrect:'mal',
		audiotiempo:'tiempo',
		preguntaaudio:'pregunta',
		opcionesaudio:null,
		correcta:1
	},
	
	{
		id:3,
		tipo:'arrastrar',
	},
	{
		id:4,
		tipo:'seleccionmultiple',
		pregunta:'¿Cuales son las cláusulas especiales que debemos verificar en las pólizas?',
		opciones:[
			'Cláusula de proporcionalidad',
			'Cláusula de no cancelación por mora en el pago de la prima.',
			'Cláusula de indemnidad',
			'A y B son correctas'
		],
		retroalimentacion:'<p>Recuerda que la <span>Cláusula de proporcionalidad,</span> hace referencia a la inaplicabilidad de esta u otra similar, evitando que apliquen a los perjuicios el porcentaje incumplido del contrato. y la <span>Cláusula de no cancelación por mora en el pago,</span> es la cláusula que indique que la póliza no terminará automáticamente por mora en el pago de la prima del proveedor.</p>',
		audiocorrect:'retroalimentacion',
		audioincorrect:'retroalimentacion',
		audiotiempo:'tiempo',
		preguntaaudio:'pregunta',
		opcionesaudio:false,
		correcta:4,
		parejas:[]
	}
]
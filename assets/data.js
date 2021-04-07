var data_preguntas = [
	{
		id:1,
		tipo:'verdaderofalso',
		pregunta:'¿Es correcto decir que la mayoría de contratos requieren pólizas?',
		opciones:[
			'Verdadero',
			'Falso'
		],
		retroalimentacion:'<p><span>Correcto.</span> <br />¡La gran mayoría! Dado que nos pueden ocasionar afectación en el patrimonio por:</p><ul><li>Retracto de la oferta</li><li>Incumplimiento de obligaciones contractuales</li><li>Incumplimiento de obligaciones laborales</li><li>Daños a nuestros bienes o de terceros</li><li>Y lesiones personales o muerte de empleados o terceros</li></ul><p>Por lo tanto, antes de celebrar cualquier contrato consulta con el área de seguros.</p>',
		cc:1,
		audiocorrect:'',
		audioincorrect:'',
		audiotiempo:'',
		audioretroalimentacion:true,
		preguntaaudio:'pregunta',
		opcionesaudio:null,
		correcta:1
	},
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
		cc:2,
		audiocorrect:'',
		audioincorrect:'4-mal',
		audiotiempo:'5-tiempo',
		audioretroalimentacion:true,
		preguntaaudio:'pregunta',
		opcionesaudio:false,
		correcta:4
	},
	{
		id:3,
		tipo:'arrastrar',
		cc:3,
		audiocorrect:'',
		audioincorrect:'',
		audiotiempo:'',
		audioretroalimentacion:false,
		preguntaaudio:'pregunta',
		pregunta:'Definición y revisión de pólizas',
		enunciado:'En este punto deberás arrastrar y ordenar los siguientes procesos. Lee y analiza muy bien para que alcances el máximo puntaje.',
		opcionesaudio:false,
		opciones:[
			'<span>Consulte vía SAS</span>, en el software equivalente a la Coordinación de Seguros o con el área encargada adjuntando el <span>formato FA-1602</span> y/o plantilla de definición de pólizas equivalente.',
			'Luego de emitido el <span>concepto</span> de seguros y las pólizas sean presentadas por el proveedor, el responsable del contrato deberá solicitar revisión vía SAS o en el <span>software equivalente</span>',
			'En caso que las pólizas presentadas <span>no cumplan</span> con lo requerido, se establecerán las razones en el SAS o en el software equivalente y la solicitud será puesta en <span>STOP.</span>',
			'Al momento que sean corregidos, la <span>Coordinación de Seguros</span> o el área encargada procederá con su revisión y aprobación'
		]		
	},
	{
		id:4,
		tipo:'seleccionmultiple',
		cc:4,
		pregunta:'¿Cuales son las cláusulas especiales que debemos verificar en las pólizas?',
		opciones:[
			'Cláusula de proporcionalidad',
			'Cláusula de no cancelación por mora en el pago de la prima.',
			'Cláusula de indemnidad',
			'A y B son correctas'
		],
		retroalimentacion:'<p>Recuerda que la <span>Cláusula de proporcionalidad,</span> hace referencia a la inaplicabilidad de esta u otra similar, evitando que apliquen a los perjuicios el porcentaje incumplido del contrato. y la <span>Cláusula de no cancelación por mora en el pago,</span> es la cláusula que indique que la póliza no terminará automáticamente por mora en el pago de la prima del proveedor.</p>',
		audiocorrect:'',
		audioincorrect:'4-mal',
		audiotiempo:'5-tiempo',
		audioretroalimentacion:true,
		preguntaaudio:'pregunta',
		opcionesaudio:false,
		correcta:4
	},
	{
		id:5,
		tipo:'emparejamiento',
		cc:5,
		audiocorrect:'',
		audioincorrect:'',
		audiotiempo:'',
		audioretroalimentacion:true,
		preguntaaudio:'pregunta',
		pregunta:'Los procesos de contratación y al ejecutar los contratos se debe:',
		opciones:[
			{
				opcion1:'Incluir en el contrato',
				opcion2:'un plan de inversión del anticipo (póliza no cubren el riesgo de amortización)'
			},
			{
				opcion1:'La Póliza de seriedad',
				opcion2:'debe estar vigente hasta que se suscriba el contrato y se reciban las pólizas de etapa contractual'
			},
			{
				opcion1:'El Administrador del contrato',
				opcion2:'debe realizar el seguimiento al vencimiento de las pólizas y solicitar al proveedor su renovación en caso de ser necesario. Tenga presente que la renovación automática del contrato, no implica la renovación de las pólizas.'
			},
			{
				opcion1:'Solicitar al proveedor',
				opcion2:'que notifique a la aseguradora: actas de inicio, suspensión, reinicio y finalización. Todos los cambios al contrato. La modificación de la póliza debe ser validada por el área de seguros'
			},
			{
				opcion1:'En caso que el proveedor solicite cartas de no siniestro,',
				opcion2:'se debe consultar con el área de seguros'
			},
			{
				opcion1:'Previo a que se realice una movilización de mercancía',
				opcion2:'el administrador deberá consultar a través de SAS o software equivalente a la Coordinación de Seguros o área encargada para validar su cobertura adjuntando el formato FA-189 o formato equivalente.'
			},
			{
				opcion1:'Solicitar al inicio y con cierta frecuencia',
				opcion2:'la relación de trabajadores asignados a cada contrato.'
			}
		]
	},
	{
		id:6,
		tipo:'seleccionmultiple',
		cc:6,
		pregunta:'¿Cuáles de las siguientes situaciones deben ser notificadas al área de seguros?',
		opciones:[
			'La actividad del contrato presenta retrasos en el cronograma',
			'Después de recibidas las obras se empieza a evidenciar un deterioro inusual en estas',
			'Se recibe una reclamación por parte de los funcionarios del contratista asignados a la ejecución de nuestro contrato, alegando que no han recibido el pago de sus salarios',
			//'El proveedor se encuentra incumpliendo sus obligaciones y propone prorrogar la vigencia del contrato para tener tiempo para subsanar',
			'Todas las anteriores'
		],
		retroalimentacion:'<p><span>¡Muy bien!</span> <br /> En los procesos de contratación y al ejecutar los contratos recuerde:</p><ul><li>Integrar a la Coordinación de Seguros o área encargada en la toma de decisiones ante cualquier alerta de incumplimiento o de siniestro</li><li>Si el contrato garantizado contempla la necesidad de agotar un procedimiento previo para poder declarar el incumplimiento (v.gr. mecanismo de arreglo directo, amigable componedor, etc.), este deberá surtirse con miras a evitar que la aseguradora excepcione la inobservancia de un requisito contractual necesario para solicitar el pago de la indemnización</li><li>En caso de incumplimiento se deberá suspender los pagos hasta tanto no se regularice la ejecución del contrato y se determine la responsabilidad en el incumplimiento</li><li>No concilie, trance, realice acuerdos, sin el aval de la compañía de seguros</li><ul>',
		audiocorrect:'',
		audioincorrect:'',
		audiotiempo:'',
		audioretroalimentacion:true,
		preguntaaudio:'pregunta',
		opcionesaudio:false,
		correcta:4
	},
	{
		id:7,
		tipo:'verdaderofalso',
		cc:7,
		pregunta:'Cuando un contrato es renovado, ¿las pólizas son renovadas automáticamente?',
		opciones:[
			'Verdadero',
			'Falso'
		],
		retroalimentacion:'<p><span>Correcto.</span> <br />¡La gran mayoría! Dado que nos pueden ocasionar afectación en el patrimonio por:</p><ul><li>Retracto de la oferta</li><li>Incumplimiento de obligaciones contractuales</li><li>Incumplimiento de obligaciones laborales</li><li>Daños a nuestros bienes o de terceros</li><li>Y lesiones personales o muerte de empleados o terceros</li></ul><p>Por lo tanto, antes de celebrar cualquier contrato consulta con el área de seguros.</p>',
		audiocorrect:'',
		audioincorrect:'',
		audiotiempo:'',
		audioretroalimentacion:false,
		preguntaaudio:'pregunta',
		opcionesaudio:null,
		correcta:2
	},
	{
		id:8,
		tipo:'seleccionmultiple',
		cc:8,
		pregunta:'¿Quién debe hacerles seguimiento a los vencimientos de las pólizas presentadas por los proveedores?',
		opciones:[
			'El intermediario de seguros de Promigas',
			'El administrador del contrato',
			'El gerente del área responsable de la contratación',
			'El proveedor'
		],
		retroalimentacion:'<p><span>No olvides que:</span></p><ul><li>Los seguros por lo general cuentan con una vigencia de 12 meses.</li><li>Las pólizas de cumplimiento y de responsabilidad civil derivadas de cumplimiento usualmente tienen una vigencia igual al plazo de ejecución del contrato con un máximo de 5 años.</li><li>Y según el manual de gestión de contratos 🡪 GMA-788 o documento equivalente, los administradores de contrato deben tener presentes los vencimientos de las pólizas de cada contrato y deben solicitar su renovación de ser necesario.</li><ul>',
		audiocorrect:'',
		audioincorrect:'',
		audiotiempo:'',
		audioretroalimentacion:true,
		preguntaaudio:'pregunta',
		opcionesaudio:false,
		correcta:2
	},
	{
		id:9,
		tipo:'seleccionmultiple',
		cc:9,
		pregunta:'¿Cuál es el proceso para la Gestión de Siniestros en PROMIGAS?',
		opciones:[
			'Reporte Inicial, Concepto, Reclamación, Ajuste y Acuerdo del ajuste',
			'Recepción de la declaración, Apertura del expediente, Valoración inicial del siniestro y Resolución de la tramitación',
			'Concepto y reclamación instantánea',
			'Ninguna de las anteriores'
		],
		retroalimentacion:'<p>Además, ten en cuenta las tareas a realizar en cada una de las fases del proceso, presta atención:</p><p><span>En el Reporte Inicial</span></p><ul><li>Reportar todo daño/ perjuicio o posible pérdida patrimonial</li><li>Esto debe ser inmediato</li><li>Analiza las circunstancias: modo, tiempo y lugar</li><li>Y realiza la estimación de pérdidas</li><ul><p>Para el Concepto</p><ul><li>Realiza una evaluación preliminar</li><li>Y da aviso del siniestro</li></ul><p><span>En el proceso de Reclamación</span></p><ul><li>¿Qué Gerencia que sufrió la pérdida?: Ocurrencia y cuantía</li><li>Y realiza la coordinación de seguros: reclamación</li></ul><p>En el caso del Ajuste <br />Si hay diferencias, la liquidación será revisada por la gerencia encargada de cuantificar la pérdida. Cuando la pérdida es superior a 2.400 smmlv, la revisará la VP o Gerencia General.</p><p>Y para el Acuerdo del ajuste<br />En caso de no acuerdo con asegurador, se informará a la VP asuntos corporativos o área encargada para determinar el curso. Solo la Presidencia de Promigas podrá autorizar el pago comercial.</p>',
		audiocorrect:'',
		audioincorrect:'',
		audiotiempo:'',
		audioretroalimentacion:true,
		preguntaaudio:'pregunta',
		opcionesaudio:false,
		correcta:1
	}
	
]
INSERT INTO SidProcedimiento
	(
		bActivo, sNombre, sInformacion, sDescripcion, sIcono, sRutaItem, sRutaMod, sRutaSubmod, sTipo
	)
	VALUES
	   (1, 'HOME', 'Home', '', '', '', '/', '', 'MODULO'),
	   (1, 'PERFIL', 'Mi perfil', 'Puede actulizar sus credenciales', 'Person', '', '/perfil', '', 'MODULO'),
	   (1, 'ACTIVIDADES', 'Registro de actividades', '', 'SupervisorAccount', '', '/actividades', '', 'MODULO'),
	   (1, 'LINEAMIENTOS', 'Lineamientos Generales', '', 'AddBox', '', '/lineamientos', '', 'MODULO'),
	   (1, 'PROCESOS', 'Procesos', '', 'Settings', '', '/procesos', '', 'MODULO'),
	   (1, 'UTILIDADES', 'Utilidades', '', 'LiveHelp', '', '/utilidades', '', 'MODULO'),
	   (1, 'REPORTES', 'Reportes', '', 'BarChartRounded', '', '/reportes', '', 'MODULO'),

INSERT INTO SidProcedimiento
	(
		bActivo, sNombre, sInformacion, sDescripcion, sIcono, sRutaItem, sRutaMod, sRutaSubmod, sTipo
	)
	VALUES
	   (1, 'REGISTRAR PRODUCCION', 'Registro de actividades', 'Registro de actividades', 'Person', '', '/actividades', '/registrar', 'SUB_MODULO'),
	   (1, 'NUEVO INTERPOL', 'Nuevo interpol emitidos', 'Registro de fichas de interpol emitida.', 'AddBox', '', '/procesos', '/nuevo-interpol', 'SUB_MODULO'),
	   (1, 'NUEVO OPERATIVO', 'Nuevo operativos', 'Crear operativo.', 'AddBox', '', '/procesos', '/nuevo-operativo', 'MODULO'),
	   (1, 'BUSCAR INTERPOL', 'Interpol Emitidos', 'Fichas de interpol registradas y emitida.', 'AddBox', '', '/utilidades', '/buscar-interpol', 'SUB_MODULO'),
	   (1, 'BUSCAR OPERATIVO', 'Operativos', 'Operativos realizados desde el año 2019 a la actualidad.', 'AddBox', '', '/utilidades', '/buscar-operativo', 'SUB_MODULO'),
	   (1, 'SOLICITUDES MESA DIGITAL', '', 'Reporte estadístico de solicitudes, para los procedimientos de Nacionalización, realizados en Mesa Digital.', 'AddBox', '', '/reportes', '/mesa-digital', 'SUB_MODULO'),
	   (1, 'OPERATIVOS', 'Operativos', 'Reporte estadístico de operativos realizados, desde el año 2019 a la actualidad.', 'AddBox', '', '/reportes', '/operativos', 'SUB_MODULO'),
	   (1, 'PRODUCCIÓN SUB DIRECCIÓN DE FISCALIZACIÓN MIGRATORIA', 'Producción', 'Formato S01.RH.FR.050 de Actividades.', 'AddBox', '', '/reportes', '/produccion', 'SUB_MODULO'),
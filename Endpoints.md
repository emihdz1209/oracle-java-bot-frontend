# Endpoints disponibles

[**Autenticación	12**](#autenticación)

[Login	12](#login)

[Endpoint	12](#endpoint)

[Descripción	12](#descripción)

[Request	12](#request)

[Ejemplo con curl	12](#ejemplo-con-curl)

[Response	12](#response)

[Uso en frontend	13](#uso-en-frontend)

[**Registro de usuario	13**](#registro-de-usuario)

[Endpoint	13](#endpoint-1)

[Request	13](#request-1)

[Ejemplo curl	14](#ejemplo-curl)

[Respuesta	14](#respuesta)

[**Usuarios	14**](#usuarios)

[Obtener lista de usuarios	14](#obtener-lista-de-usuarios)

[Endpoint	14](#endpoint-2)

[Descripción	14](#descripción-1)

[Ejemplo	15](#ejemplo)

[Respuesta	15](#respuesta-1)

[**Estados de Tarea	15**](#estados-de-tarea)

[Obtener estados	15](#obtener-estados)

[Endpoint	15](#endpoint-3)

[Descripción	15](#descripción-2)

[Ejemplo	15](#ejemplo-1)

[Respuesta	16](#respuesta-2)

[**Crear estado de tarea	16**](#crear-estado-de-tarea)

[Endpoint	16](#endpoint-4)

[Request	16](#request-2)

[Ejemplo	16](#ejemplo-2)

[Respuesta	17](#respuesta-3)

[**Prioridades	17**](#prioridades)

[Obtener prioridades	17](#obtener-prioridades)

[Endpoint	17](#endpoint-5)

[Descripción	17](#descripción-3)

[Ejemplo	17](#ejemplo-3)

[Respuesta	17](#respuesta-4)

[**Crear prioridad	18**](#crear-prioridad)

[Endpoint	18](#endpoint-6)

[Request	18](#request-3)

[Ejemplo	18](#ejemplo-4)

[Respuesta	18](#respuesta-5)

[**Autenticación API	19**](#autenticación-api)

[1\. Obtener token	19](#1.-obtener-token)

[2\. Usar token	19](#2.-usar-token)

[3\. Manejo en frontend	20](#3.-manejo-en-frontend)

[**Sprint KPIs Endpoint	20**](#sprint-kpis-endpoint)

[Endpoint	20](#endpoint-7)

[Path Parameter	20](#path-parameter)

[Autenticación	20](#autenticación-1)

[Ejemplo de Request	21](#ejemplo-de-request)

[Ejemplo de Response	21](#ejemplo-de-response)

[Campos de respuesta	21](#campos-de-respuesta)

[Ejemplo de uso en Frontend (JavaScript)	22](#ejemplo-de-uso-en-frontend-\(javascript\))

[Posibles respuestas de error	23](#posibles-respuestas-de-error)

[401 Unauthorized	23](#401-unauthorized)

[500 Internal Server Error	23](#500-internal-server-error)

[Uso esperado en la UI	23](#uso-esperado-en-la-ui)

[**Rendimiento Comparativo por Desarrollador	24**](#rendimiento-comparativo-por-desarrollador)

[Descripción	24](#descripción-4)

[Ruta	24](#ruta)

[Parámetros	24](#parámetros)

[Path parameters	24](#path-parameters)

[Autenticación	25](#autenticación-2)

[Ejemplo de Request	25](#ejemplo-de-request-1)

[Ejemplo de Response	26](#ejemplo-de-response-1)

[Campos de respuesta	27](#campos-de-respuesta-1)

[Nivel desarrollador	27](#nivel-desarrollador)

[Rendimiento global	28](#rendimiento-global)

[Histórico por sprint	28](#histórico-por-sprint)

[Uso esperado en frontend	29](#uso-esperado-en-frontend)

[Leaderboard de desarrolladores	29](#leaderboard-de-desarrolladores)

[Multi-line Chart (tendencia)	29](#multi-line-chart-\(tendencia\))

[Heatmap de productividad	29](#heatmap-de-productividad)

[Resultado	29](#resultado)

[**Crear Equipo	30**](#crear-equipo)

[Descripción	30](#descripción-5)

[Ruta	30](#ruta-1)

[Autenticación	30](#autenticación-3)

[Body (JSON)	30](#body-\(json\))

[Campos del Body	31](#campos-del-body)

[Ejemplo de Request	31](#ejemplo-de-request-2)

[Ejemplo de Response	31](#ejemplo-de-response-2)

[Campos de Respuesta	32](#campos-de-respuesta-2)

[Comportamiento del sistema	32](#comportamiento-del-sistema)

[Uso esperado en el frontend	32](#uso-esperado-en-el-frontend)

[**Obtener Equipos	32**](#obtener-equipos)

[Descripción	33](#descripción-6)

[Ruta	33](#ruta-2)

[Autenticación	33](#autenticación-4)

[Ejemplo de Request	33](#ejemplo-de-request-3)

[Ejemplo de Response	33](#ejemplo-de-response-3)

[Campos de Respuesta	34](#campos-de-respuesta-3)

[Uso esperado en el frontend	34](#uso-esperado-en-el-frontend-1)

[**Obtener Equipo por ID	34**](#obtener-equipo-por-id)

[Descripción	34](#descripción-7)

[Ruta	35](#ruta-3)

[Parámetros	35](#parámetros-1)

[Autenticación	35](#autenticación-5)

[Ejemplo de Request	35](#ejemplo-de-request-4)

[Ejemplo de Response	35](#ejemplo-de-response-4)

[Uso esperado en el frontend	36](#uso-esperado-en-el-frontend-2)

[**Obtener Miembros del Equipo	36**](#obtener-miembros-del-equipo)

[Descripción	36](#descripción-8)

[Ruta	36](#ruta-4)

[Ejemplo de Request	36](#ejemplo-de-request-5)

[Ejemplo de Response	36](#ejemplo-de-response-5)

[Campos de Respuesta	37](#campos-de-respuesta-4)

[Uso esperado en el frontend	37](#uso-esperado-en-el-frontend-3)

[**Agregar Miembro al Equipo	37**](#agregar-miembro-al-equipo)

[Descripción	37](#descripción-9)

[Ruta	37](#ruta-5)

[Ejemplo de Request	37](#ejemplo-de-request-6)

[Respuesta	38](#respuesta-6)

[Error posible	38](#error-posible)

[Uso esperado en el frontend	38](#uso-esperado-en-el-frontend-4)

[**Eliminar Miembro del Equipo	38**](#eliminar-miembro-del-equipo)

[Descripción	38](#descripción-10)

[Ruta	38](#ruta-6)

[Ejemplo de Request	38](#ejemplo-de-request-7)

[Respuesta	39](#respuesta-7)

[Uso esperado en el frontend	39](#uso-esperado-en-el-frontend-5)

[**Crear Proyecto	39**](#crear-proyecto)

[Descripción	39](#descripción-11)

[Ruta	39](#ruta-7)

[Parámetros	39](#parámetros-2)

[Autenticación	40](#autenticación-6)

[Body (JSON)	40](#body-\(json\)-1)

[Campos del Body	40](#campos-del-body-1)

[Ejemplo de Response	40](#ejemplo-de-response-6)

[Comportamiento del sistema	41](#comportamiento-del-sistema-1)

[Uso esperado en el frontend	41](#uso-esperado-en-el-frontend-6)

[**Obtener Proyectos por Equipo	41**](#obtener-proyectos-por-equipo)

[Descripción	41](#descripción-12)

[Ruta	41](#ruta-8)

[Ejemplo de Request	41](#ejemplo-de-request-8)

[Ejemplo de Response	42](#ejemplo-de-response-7)

[Uso esperado en el frontend	42](#uso-esperado-en-el-frontend-7)

[**Obtener Proyecto por ID	42**](#obtener-proyecto-por-id)

[Descripción	42](#descripción-13)

[Ruta	42](#ruta-9)

[Ejemplo de Response	43](#ejemplo-de-response-8)

[Uso esperado en el frontend	43](#uso-esperado-en-el-frontend-8)

[**Actualizar Proyecto	43**](#actualizar-proyecto)

[Descripción	43](#descripción-14)

[Ruta	43](#ruta-10)

[Body (JSON)	43](#body-\(json\)-2)

[Restricciones	44](#restricciones)

[Uso esperado en el frontend	44](#uso-esperado-en-el-frontend-9)

[**Eliminar Proyecto	44**](#eliminar-proyecto)

[Descripción	44](#descripción-15)

[Ruta	44](#ruta-11)

[Restricciones	44](#restricciones-1)

[Respuesta	45](#respuesta-8)

[Uso esperado en el frontend	45](#uso-esperado-en-el-frontend-10)

[**Obtener Progreso del Proyecto	45**](#obtener-progreso-del-proyecto)

[Descripción	45](#descripción-16)

[Ruta	45](#ruta-12)

[Ejemplo de Response	45](#ejemplo-de-response-9)

[Uso esperado en el frontend	45](#uso-esperado-en-el-frontend-11)

[**Obtener Miembros de un Proyecto	46**](#obtener-miembros-de-un-proyecto)

[Descripción	46](#descripción-17)

[Ruta	46](#ruta-13)

[Parámetros	46](#parámetros-3)

[Autenticación	46](#autenticación-7)

[Ejemplo de Request	46](#ejemplo-de-request-9)

[Ejemplo de Response	46](#ejemplo-de-response-10)

[Campos de Respuesta	47](#campos-de-respuesta-5)

[Uso esperado en el frontend	47](#uso-esperado-en-el-frontend-12)

[**Agregar Miembro a un Proyecto	47**](#agregar-miembro-a-un-proyecto)

[Descripción	47](#descripción-18)

[Ruta	47](#ruta-14)

[Parámetros	48](#parámetros-4)

[Autenticación	48](#autenticación-8)

[Ejemplo de Request	48](#ejemplo-de-request-10)

[Respuesta	48](#respuesta-9)

[Validaciones del sistema	48](#validaciones-del-sistema)

[Errores posibles	48](#errores-posibles)

[Comportamiento del sistema	49](#comportamiento-del-sistema-2)

[Uso esperado en el frontend	49](#uso-esperado-en-el-frontend-13)

[**Eliminar Miembro de un Proyecto	49**](#eliminar-miembro-de-un-proyecto)

[Descripción	49](#descripción-19)

[Ruta	49](#ruta-15)

[Parámetros	49](#parámetros-5)

[Autenticación	50](#autenticación-9)

[Ejemplo de Request	50](#ejemplo-de-request-11)

[Respuesta	50](#respuesta-10)

[Validaciones del sistema	50](#validaciones-del-sistema-1)

[Error posible	50](#error-posible-1)

[Comportamiento del sistema	50](#comportamiento-del-sistema-3)

[Uso esperado en el frontend	51](#uso-esperado-en-el-frontend-14)

[**Crear Sprint	51**](#crear-sprint)

[Descripción	51](#descripción-20)

[Ruta	51](#ruta-16)

[Parámetros	51](#parámetros-6)

[Autenticación	51](#autenticación-10)

[Body (JSON)	52](#body-\(json\)-3)

[Campos del Body	52](#campos-del-body-2)

[Ejemplo de Request	52](#ejemplo-de-request-12)

[Ejemplo de Response	53](#ejemplo-de-response-11)

[Validaciones del sistema	53](#validaciones-del-sistema-2)

[Error posible	53](#error-posible-2)

[Comportamiento del sistema	53](#comportamiento-del-sistema-4)

[Uso esperado en el frontend	53](#uso-esperado-en-el-frontend-15)

[**Obtener Sprints de un Proyecto	54**](#obtener-sprints-de-un-proyecto)

[Descripción	54](#descripción-21)

[Ruta	54](#ruta-17)

[Parámetros	54](#parámetros-7)

[Autenticación	54](#autenticación-11)

[Ejemplo de Request	54](#ejemplo-de-request-13)

[Ejemplo de Response	55](#ejemplo-de-response-12)

[Uso esperado en el frontend	55](#uso-esperado-en-el-frontend-16)

[**Obtener Sprint por ID	55**](#obtener-sprint-por-id)

[Descripción	55](#descripción-22)

[Ruta	55](#ruta-18)

[Parámetros	55](#parámetros-8)

[Autenticación	56](#autenticación-12)

[Ejemplo de Request	56](#ejemplo-de-request-14)

[Ejemplo de Response	56](#ejemplo-de-response-13)

[Uso esperado en el frontend	56](#uso-esperado-en-el-frontend-17)

[**Actualizar Sprint	57**](#actualizar-sprint)

[Descripción	57](#descripción-23)

[Ruta	57](#ruta-19)

[Parámetros	57](#parámetros-9)

[Body (JSON)	57](#body-\(json\)-4)

[Ejemplo de Request	57](#ejemplo-de-request-15)

[Error posible	58](#error-posible-3)

[Comportamiento del sistema	58](#comportamiento-del-sistema-5)

[Uso esperado en el frontend	58](#uso-esperado-en-el-frontend-18)

[**Eliminar Sprint	58**](#eliminar-sprint)

[Descripción	58](#descripción-24)

[Ruta	59](#ruta-20)

[Parámetros	59](#parámetros-10)

[Autenticación	59](#autenticación-13)

[Ejemplo de Request	59](#ejemplo-de-request-16)

[Validaciones del sistema	59](#validaciones-del-sistema-3)

[Error posible	59](#error-posible-4)

[Comportamiento del sistema	60](#comportamiento-del-sistema-6)

[Uso esperado en el frontend	60](#uso-esperado-en-el-frontend-19)

[**Crear Tarea	60**](#crear-tarea)

[Descripción	60](#descripción-25)

[Ruta	60](#ruta-21)

[Autenticación	60](#autenticación-14)

[Body (JSON)	60](#body-\(json\)-5)

[Campos del Body	61](#campos-del-body-3)

[Ejemplo de Response	61](#ejemplo-de-response-14)

[Comportamiento del sistema	62](#comportamiento-del-sistema-7)

[**Obtener tareas por proyecto	62**](#obtener-tareas-por-proyecto)

[Ruta	62](#ruta-22)

[Descripción	62](#descripción-26)

[Ejemplo de Response	63](#ejemplo-de-response-15)

[**Obtener tarea por ID	63**](#obtener-tarea-por-id)

[Ruta	63](#ruta-23)

[Descripción	63](#descripción-27)

[**Actualizar tarea	63**](#actualizar-tarea)

[Ruta	63](#ruta-24)

[Descripción	63](#descripción-28)

[Ejemplo Body	63](#ejemplo-body)

[Comportamiento	64](#comportamiento)

[**Cambiar estado de tarea	64**](#cambiar-estado-de-tarea)

[Ruta	64](#ruta-25)

[Descripción	64](#descripción-29)

[Estados relevantes	64](#estados-relevantes)

[Comportamiento del sistema	65](#comportamiento-del-sistema-8)

[**Obtener progreso del proyecto (impacto indirecto)	65**](#obtener-progreso-del-proyecto-\(impacto-indirecto\))

[Ruta	65](#ruta-26)

[Descripción	65](#descripción-30)

[Ejemplo	65](#ejemplo-5)

[Lógica	65](#lógica)

[**Eliminar tarea	66**](#eliminar-tarea)

[Ruta	66](#ruta-27)

[Descripción	66](#descripción-31)

[Reglas de negocio	66](#reglas-de-negocio)

[Ejemplo error	66](#ejemplo-error)

[**Obtener usuarios asignados a una tarea	66**](#obtener-usuarios-asignados-a-una-tarea)

[Ruta	66](#ruta-28)

[Descripción	66](#descripción-32)

[Ejemplo de Request	67](#ejemplo-de-request-17)

[Ejemplo de Response	67](#ejemplo-de-response-16)

[Comportamiento del sistema	67](#comportamiento-del-sistema-9)

[**Asignar usuario a tarea	67**](#asignar-usuario-a-tarea)

[Ruta	67](#ruta-29)

[Descripción	67](#descripción-33)

[Ejemplo de Request	68](#ejemplo-de-request-18)

[Respuesta	68](#respuesta-11)

[Validaciones del sistema	68](#validaciones-del-sistema-4)

[1\. Existencia de la tarea	68](#1.-existencia-de-la-tarea)

[2\. Pertenencia al equipo del proyecto	68](#2.-pertenencia-al-equipo-del-proyecto)

[3\. No duplicidad	68](#3.-no-duplicidad)

[Errores posibles	68](#errores-posibles-1)

[Usuario no pertenece al equipo	68](#usuario-no-pertenece-al-equipo)

[Usuario ya asignado	69](#usuario-ya-asignado)

[Tarea no encontrada	69](#tarea-no-encontrada)

[Comportamiento del sistema	69](#comportamiento-del-sistema-10)

[**Remover usuario de tarea	69**](#remover-usuario-de-tarea)

[Ruta	69](#ruta-30)

[Descripción	69](#descripción-34)

[Ejemplo de Request	70](#ejemplo-de-request-19)

[Respuesta	70](#respuesta-12)

[Validaciones del sistema	70](#validaciones-del-sistema-5)

[Error posible	70](#error-posible-5)

[Comportamiento del sistema	70](#comportamiento-del-sistema-11)

[Reglas de negocio clave	70](#reglas-de-negocio-clave)

[1\. Integridad organizacional	70](#1.-integridad-organizacional)

[2\. No duplicidad	71](#2.-no-duplicidad)

[3\. Relación indirecta validada	71](#3.-relación-indirecta-validada)

[4\. Eliminación controlada	71](#4.-eliminación-controlada)

[Uso esperado en el frontend	71](#uso-esperado-en-el-frontend-20)

[**Project Documents Upload Endpoint	71**](#project-documents-upload-endpoint)

[Endpoint	72](#endpoint-8)

[Path Parameter	72](#path-parameter-1)

[Body	72](#body)

[Autenticación	72](#autenticación-15)

[Ejemplo de Request	73](#ejemplo-de-request-20)

[Ejemplo de Response	73](#ejemplo-de-response-17)

[Campos de respuesta	73](#campos-de-respuesta-6)

[Ejemplo de uso en Frontend JavaScript	74](#ejemplo-de-uso-en-frontend-javascript)

[Posibles respuestas de error	75](#posibles-respuestas-de-error-1)

[400 Bad Request	75](#400-bad-request)

[401 Unauthorized	75](#401-unauthorized-1)

[500 Internal Server Error	75](#500-internal-server-error-1)

[Uso esperado en la UI	76](#uso-esperado-en-la-ui-1)

[Sugerencia para el frontend	76](#sugerencia-para-el-frontend)

[**Project Documents List Endpoint	76**](#project-documents-list-endpoint)

[Endpoint	76](#endpoint-9)

[Path Parameter	77](#path-parameter-2)

[Query Parameter Opcional	77](#query-parameter-opcional)

[Autenticación	77](#autenticación-16)

[Ejemplo de Request	78](#ejemplo-de-request-21)

[Ejemplo de Request con filtro	78](#ejemplo-de-request-con-filtro)

[Ejemplo de Response	78](#ejemplo-de-response-18)

[Campos de respuesta	79](#campos-de-respuesta-7)

[Ejemplo de uso en Frontend JavaScript	79](#ejemplo-de-uso-en-frontend-javascript-1)

[Ejemplo de uso con filtro en Frontend JavaScript	80](#ejemplo-de-uso-con-filtro-en-frontend-javascript)

[Posibles respuestas de error	80](#posibles-respuestas-de-error-2)

[400 Bad Request	80](#400-bad-request-1)

[401 Unauthorized	81](#401-unauthorized-2)

[500 Internal Server Error	81](#500-internal-server-error-2)

[Uso esperado en la UI	81](#uso-esperado-en-la-ui-2)

[Sugerencia para el frontend	82](#sugerencia-para-el-frontend-1)

[**Project Document Delete Endpoint	82**](#project-document-delete-endpoint)

[Endpoint	82](#endpoint-10)

[Path Parameter	82](#path-parameter-3)

[Autenticación	82](#autenticación-17)

[Ejemplo de Request	83](#ejemplo-de-request-22)

[Ejemplo de Response	83](#ejemplo-de-response-19)

[Comportamiento interno	83](#comportamiento-interno)

[Validación posterior	84](#validación-posterior)

[Posibles respuestas de error	84](#posibles-respuestas-de-error-3)

[400 Bad Request	84](#400-bad-request-2)

[401 Unauthorized	84](#401-unauthorized-3)

[500 Internal Server Error	84](#500-internal-server-error-3)

[Uso esperado en la UI	85](#uso-esperado-en-la-ui-3)

[Sugerencia para el frontend	85](#sugerencia-para-el-frontend-2)

[**AI Backlog Generation Endpoint	85**](#ai-backlog-generation-endpoint)

[Endpoint	86](#endpoint-11)

[Path Parameter	86](#path-parameter-4)

[Body	86](#body-1)

[Autenticación	87](#autenticación-18)

[Ejemplo de Request	87](#ejemplo-de-request-23)

[Ejemplo de Response	87](#ejemplo-de-response-20)

[Campos de respuesta	88](#campos-de-respuesta-8)

[Evento publicado en Kafka	88](#evento-publicado-en-kafka)

[Flujo interno del endpoint	89](#flujo-interno-del-endpoint)

[Ejemplo de uso en Frontend JavaScript	90](#ejemplo-de-uso-en-frontend-javascript-2)

[Posibles respuestas de error	91](#posibles-respuestas-de-error-4)

[400 Bad Request	91](#400-bad-request-3)

[401 Unauthorized	92](#401-unauthorized-4)

[500 Internal Server Error	92](#500-internal-server-error-4)

[Uso esperado en la UI	92](#uso-esperado-en-la-ui-4)

[Sugerencia para el frontend	93](#sugerencia-para-el-frontend-3)

[**AI Task Suggestions List Endpoint	94**](#ai-task-suggestions-list-endpoint)

[Endpoint	94](#endpoint-12)

[Path Parameter	94](#path-parameter-5)

[Query Parameter Opcional	94](#query-parameter-opcional-1)

[Autenticación	95](#autenticación-19)

[Ejemplo de Request	95](#ejemplo-de-request-24)

[Ejemplo de Request con filtro	95](#ejemplo-de-request-con-filtro-1)

[Ejemplo de Response	95](#ejemplo-de-response-21)

[Campos de respuesta	96](#campos-de-respuesta-9)

[Estados de sugerencia	97](#estados-de-sugerencia)

[Ejemplo de uso en Frontend JavaScript	98](#ejemplo-de-uso-en-frontend-javascript-3)

[Ejemplo de uso con filtro en Frontend JavaScript	98](#ejemplo-de-uso-con-filtro-en-frontend-javascript-1)

[Posibles respuestas de error	99](#posibles-respuestas-de-error-5)

[400 Bad Request	99](#400-bad-request-4)

[401 Unauthorized	100](#401-unauthorized-5)

[500 Internal Server Error	100](#500-internal-server-error-5)

[Uso esperado en la UI	100](#uso-esperado-en-la-ui-5)

[Sugerencia para el frontend	101](#sugerencia-para-el-frontend-4)

[**AI Task Suggestion Reject Endpoint	101**](#ai-task-suggestion-reject-endpoint)

[Endpoint	101](#endpoint-13)

[Path Parameter	101](#path-parameter-6)

[Autenticación	102](#autenticación-20)

[Ejemplo de Request	102](#ejemplo-de-request-25)

[Ejemplo de Response	102](#ejemplo-de-response-22)

[Campos de respuesta	103](#campos-de-respuesta-10)

[Comportamiento esperado	103](#comportamiento-esperado)

[Ejemplo de uso en Frontend JavaScript	103](#ejemplo-de-uso-en-frontend-javascript-4)

[Posibles respuestas de error	104](#posibles-respuestas-de-error-6)

[400 Bad Request	104](#400-bad-request-5)

[401 Unauthorized	105](#401-unauthorized-6)

[500 Internal Server Error	105](#500-internal-server-error-6)

[Uso esperado en la UI	105](#uso-esperado-en-la-ui-6)

[Sugerencia para el frontend	106](#sugerencia-para-el-frontend-5)

[**AI Task Suggestion Approve Endpoint	106**](#ai-task-suggestion-approve-endpoint)

[Endpoint	106](#endpoint-14)

[Path Parameter	106](#path-parameter-7)

[Body	106](#body-2)

[Autenticación	107](#autenticación-21)

[Ejemplo de Request	107](#ejemplo-de-request-26)

[Ejemplo de Response	108](#ejemplo-de-response-23)

[Campos de respuesta	109](#campos-de-respuesta-11)

[Comportamiento esperado	111](#comportamiento-esperado-1)

[Ejemplo de uso en Frontend JavaScript	111](#ejemplo-de-uso-en-frontend-javascript-5)

[Posibles respuestas de error	112](#posibles-respuestas-de-error-7)

[400 Bad Request	112](#400-bad-request-6)

[401 Unauthorized	113](#401-unauthorized-7)

[500 Internal Server Error	113](#500-internal-server-error-7)

[Uso esperado en la UI	113](#uso-esperado-en-la-ui-7)

[Sugerencia para el frontend	114](#sugerencia-para-el-frontend-6)

[**AI Duplicate Detection Start Endpoint	114**](#ai-duplicate-detection-start-endpoint)

[Endpoint	114](#endpoint-15)

[Path Parameter	114](#path-parameter-8)

[Body	115](#body-3)

[Autenticación	115](#autenticación-22)

[Ejemplo de Request	115](#ejemplo-de-request-27)

[Ejemplo de Response	116](#ejemplo-de-response-24)

[Campos de respuesta	116](#campos-de-respuesta-12)

[Estados posibles	117](#estados-posibles)

[Comportamiento esperado	117](#comportamiento-esperado-2)

[Flujo asíncrono	118](#flujo-asíncrono)

[Ejemplo de uso en Frontend JavaScript	118](#ejemplo-de-uso-en-frontend-javascript-6)

[Posibles respuestas de error	119](#posibles-respuestas-de-error-8)

[400 Bad Request	119](#400-bad-request-7)

[401 Unauthorized	120](#401-unauthorized-8)

[404 / 400 Project not found	120](#404-/-400-project-not-found)

[500 Internal Server Error	120](#500-internal-server-error-8)

[Uso esperado en la UI	121](#uso-esperado-en-la-ui-8)

[Sugerencia para el frontend	121](#sugerencia-para-el-frontend-7)

[Nota de calidad semántica	122](#nota-de-calidad-semántica)

[**AI Duplicate Detection Latest Endpoint	122**](#ai-duplicate-detection-latest-endpoint)

[Endpoint	122](#endpoint-16)

[Path Parameter	123](#path-parameter-9)

[Body	123](#body-4)

[Autenticación	123](#autenticación-23)

[Ejemplo de Request	123](#ejemplo-de-request-28)

[Ejemplo de Response	123](#ejemplo-de-response-25)

[Campos de respuesta	126](#campos-de-respuesta-13)

[Objeto run	126](#objeto-run)

[Arreglo results	126](#arreglo-results)

[Comportamiento esperado	128](#comportamiento-esperado-3)

[Estados posibles	128](#estados-posibles-1)

[Ejemplo de uso en Frontend JavaScript	129](#ejemplo-de-uso-en-frontend-javascript-7)

[Posibles respuestas de error	130](#posibles-respuestas-de-error-9)

[400 Bad Request	130](#400-bad-request-8)

[401 Unauthorized	130](#401-unauthorized-9)

[500 Internal Server Error	131](#500-internal-server-error-9)

[Uso esperado en la UI	131](#uso-esperado-en-la-ui-9)

[Sugerencia para el frontend	131](#sugerencia-para-el-frontend-8)

[**AI Duplicate Detection Runs Endpoint	132**](#ai-duplicate-detection-runs-endpoint)

[Endpoint	132](#endpoint-17)

[Path Parameter	132](#path-parameter-10)

[Body	133](#body-5)

[Autenticación	133](#autenticación-24)

[Ejemplo de Request	133](#ejemplo-de-request-29)

[Ejemplo de Response	133](#ejemplo-de-response-26)

[Campos de respuesta	134](#campos-de-respuesta-14)

[Estados posibles	135](#estados-posibles-2)

[Comportamiento esperado	136](#comportamiento-esperado-4)

[Ejemplo de uso en Frontend JavaScript	136](#ejemplo-de-uso-en-frontend-javascript-8)

[Posibles respuestas de error	137](#posibles-respuestas-de-error-10)

[400 Bad Request	137](#400-bad-request-9)

[401 Unauthorized	137](#401-unauthorized-10)

[500 Internal Server Error	137](#500-internal-server-error-10)

[Uso esperado en la UI	137](#uso-esperado-en-la-ui-10)

[Sugerencia para el frontend	138](#sugerencia-para-el-frontend-9)

[**AI Duplicate Detection Results by Run Endpoint	138**](#ai-duplicate-detection-results-by-run-endpoint)

[Endpoint	139](#endpoint-18)

[Path Parameters	139](#path-parameters-1)

[Body	139](#body-6)

[Autenticación	139](#autenticación-25)

[Ejemplo de Request	140](#ejemplo-de-request-30)

[Ejemplo de Response	140](#ejemplo-de-response-27)

[Campos de respuesta	141](#campos-de-respuesta-15)

[Comportamiento esperado	142](#comportamiento-esperado-5)

[Ejemplo de uso en Frontend JavaScript	143](#ejemplo-de-uso-en-frontend-javascript-9)

[Posibles respuestas de error	144](#posibles-respuestas-de-error-11)

[400 Bad Request	144](#400-bad-request-10)

[401 Unauthorized	144](#401-unauthorized-11)

[500 Internal Server Error	144](#500-internal-server-error-11)

[Uso esperado en la UI	144](#uso-esperado-en-la-ui-11)

[Sugerencia para el frontend	145](#sugerencia-para-el-frontend-10)

# 

# **Autenticación** {#autenticación}

## **Login** {#login}

### **Endpoint** {#endpoint}

POST /auth/login

### **Descripción** {#descripción}

Permite a un usuario autenticarse en el sistema utilizando su correo electrónico y contraseña.  
 Si las credenciales son correctas, el servidor devuelve un **JWT token** que debe enviarse en futuras solicitudes.

---

### **Request** {#request}

{

 "email": "usuario@tec.mx",

 "password": "Admin123"

}

---

### **Ejemplo con curl** {#ejemplo-con-curl}

curl \-X POST http://localhost:8080/auth/login \\

\-H "Content-Type: application/json" \\

\-d '{

"email":"a01220835@tec.mx",

"password":"Admin123"

}'

---

### **Response** {#response}

{

 "token": "eyJhbGciOiJIUzM4NCJ9...",

 "userId": "c58397f4-6cfc-4af6-9ed0-1b0ffd3505c1",

 "email": "a01220835@tec.mx",

 "rolId": 2

}

---

### **Uso en frontend** {#uso-en-frontend}

Guardar el token:

localStorage.setItem("token", response.token)

---

# **Registro de usuario** {#registro-de-usuario}

### **Endpoint** {#endpoint-1}

POST /auth/register

---

### **Request** {#request-1}

{

 "primerNombre": "Clay",

 "apellido": "Gutierrez",

 "email": "a01220835@tec.mx",

 "password": "Admin123",

 "telefono": "3317697074",

 "telegramId": "C490799",

 "rolId": 2,

 "managerEmail": "A01637284@tec.mx"

}

---

### **Ejemplo curl** {#ejemplo-curl}

curl \-X POST http://localhost:8080/auth/register \\

\-H "Content-Type: application/json" \\

\-d '{

"primerNombre":"Clay",

"apellido":"Gutierrez",

"email":"a01220835@tec.mx",

"password":"Admin123",

"telefono":"3317697074",

"telegramId":"C490799",

"rolId":2,

"managerEmail":"A01637284@tec.mx"

}'

---

### **Respuesta** {#respuesta}

HTTP 200 OK

(Sin body)

# **Usuarios** {#usuarios}

## **Obtener lista de usuarios** {#obtener-lista-de-usuarios}

### **Endpoint** {#endpoint-2}

GET /api/users

---

### **Descripción** {#descripción-1}

Devuelve la lista de usuarios registrados en el sistema.

---

### **Ejemplo** {#ejemplo}

cgh@Clays-MacBook-Pro-1488 oracle-java-bot-backend % curl http://localhost:8080/api/users \\

\-H "Authorization: Bearer $(curl \-s \-X POST http://localhost:8080/auth/login \\

\-H "Content-Type: application/json" \\

\-d '{"email":"a01220835@tec.mx","password":"Admin123"}' \\

| jq \-r '.token')"

---

### **Respuesta** {#respuesta-1}

\[{"apellido":"Hernandez","email":"A01637284@tec.mx","estadoId":1,"managerId":null,"primerNombre":"Emilio","rolId":1,"telefono":"3311165200","telegramId":"Emihdz1209","userId":"4f4a89ea-e990-c780-e063-f862000a17fa"},{"apellido":"Gutierrez","email":"a01220835@tec.mx","estadoId":1,"managerId":"4f4a89ea-e990-c780-e063-f862000a17fa","primerNombre":"Clay","rolId":2,"telefono":"3317697074","telegramId":"C490799","userId":"c58397f4-6cfc-4af6-9ed0-1b0ffd3505c1"}\]%  

---

# **Estados de Tarea** {#estados-de-tarea}

## **Obtener estados** {#obtener-estados}

### **Endpoint** {#endpoint-3}

GET /api/task-status

### **Descripción** {#descripción-2}

Devuelve la lista de estados disponibles para las tareas del sistema.

Estados típicos:

* Pendiente  
* En progreso  
* Terminado

### **Ejemplo** {#ejemplo-1}

curl http://localhost:8080/api/task-status

### **Respuesta** {#respuesta-2}

\[

{

 "id": 1,

 "nombre": "Pendiente"

},

{

 "id": 2,

 "nombre": "En progreso"

},

{

 "id": 3,

 "nombre": "Terminado"

}

\]

---

# **Crear estado de tarea** {#crear-estado-de-tarea}

### **Endpoint** {#endpoint-4}

POST /api/task-status

### **Request** {#request-2}

{

"nombre": "Bloqueado"

}

### **Ejemplo** {#ejemplo-2}

curl \-X POST http://localhost:8080/api/task-status \\

\-H "Content-Type: application/json" \\

\-d '{

"nombre":"Bloqueado"

}'

### **Respuesta** {#respuesta-3}

{

"id": 4,

"nombre": "Bloqueado"

}

---

# **Prioridades** {#prioridades}

## **Obtener prioridades** {#obtener-prioridades}

### **Endpoint** {#endpoint-5}

GET /api/priorities

### **Descripción** {#descripción-3}

Devuelve todas las prioridades disponibles para las tareas.

Prioridades típicas:

* Baja  
* Media  
* Alta

### **Ejemplo** {#ejemplo-3}

curl http://localhost:8080/api/priorities

### **Respuesta** {#respuesta-4}

\[

{

 "id": 1,

 "nombre": "Baja"

},

{

 "id": 2,

 "nombre": "Media"

},

{

 "id": 3,

 "nombre": "Alta"

}

\]

---

# **Crear prioridad** {#crear-prioridad}

### **Endpoint** {#endpoint-6}

POST /api/priorities

### **Request** {#request-3}

{

"nombre": "Crítica"

}

### **Ejemplo** {#ejemplo-4}

curl \-X POST http://localhost:8080/api/priorities \\

\-H "Content-Type: application/json" \\

\-d '{

"nombre":"Crítica"

}'

### **Respuesta** {#respuesta-5}

{

"id": 4,

"nombre": "Crítica"

}

---

# **Autenticación API** {#autenticación-api}

El backend utiliza **JWT (JSON Web Token)** para autenticar las peticiones.

## **1\. Obtener token** {#1.-obtener-token}

Endpoint:

POST /auth/login

Body:

{

 "email": "usuario@empresa.com",

 "password": "password"

}

Respuesta:

{

 "token": "\<JWT\_TOKEN\>"

}

---

## **2\. Usar token** {#2.-usar-token}

Todas las peticiones protegidas deben incluir el header:

Authorization: Bearer \<JWT\_TOKEN\>

Ejemplo:

GET /api/sprints/{sprintId}/kpis

Headers:

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI...

---

## **3\. Manejo en frontend** {#3.-manejo-en-frontend}

1. El frontend debe **guardar el token después del login**.  
2. El token debe enviarse en **cada request al backend**.  
3. Si el backend responde **401 Unauthorized**, el usuario debe volver a iniciar sesión. 

---

# **Sprint KPIs Endpoint** {#sprint-kpis-endpoint}

Este endpoint permite obtener métricas clave de desempeño de un **Sprint**.  
 Los KPIs se calculan a partir de las tareas asociadas al sprint.

---

## **Endpoint** {#endpoint-7}

GET /api/sprints/{sprintId}/kpis

### **Path Parameter** {#path-parameter}

| Parameter | Type | Description |
| ----- | ----- | ----- |
| sprintId | String (HEX UUID) | Identificador único del sprint |

Ejemplo:

/api/sprints/4F4F7319A8AC0A0AE063F862000A61C1/kpis

---

## **Autenticación** {#autenticación-1}

Este endpoint requiere autenticación mediante **JWT Token**.

Header requerido:

Authorization: Bearer \<JWT\_TOKEN\>

El token se obtiene previamente mediante el endpoint:

POST /auth/login

---

## **Ejemplo de Request** {#ejemplo-de-request}

GET /api/sprints/4F4F7319A8AC0A0AE063F862000A61C1/kpis

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...

---

## **Ejemplo de Response** {#ejemplo-de-response}

{

 "totalTareas": 6,

 "tareasCompletadas": 3,

 "aTiempo": 2,

 "conRetraso": 1,

 "totalEstimadoHrs": 21.0,

 "totalRealHrs": 15.0

}

---

## **Campos de respuesta** {#campos-de-respuesta}

| Campo | Tipo | Descripción |
| ----- | ----- | ----- |
| totalTareas | Integer | Número total de tareas del sprint |
| tareasCompletadas | Integer | Tareas con estado **Completado** |
| aTiempo | Integer | Tareas completadas **antes o en la fecha límite** |
| conRetraso | Integer | Tareas completadas **después de la fecha límite** |
| totalEstimadoHrs | Double | Suma de horas estimadas de las tareas |
| totalRealHrs | Double | Suma de horas reales registradas |

---

## **Ejemplo de uso en Frontend (JavaScript)** {#ejemplo-de-uso-en-frontend-(javascript)}

const token \= localStorage.getItem("token");

const response \= await fetch(

 "/api/sprints/4F4F7319A8AC0A0AE063F862000A61C1/kpis",

 {

   headers: {

     Authorization: \`Bearer ${token}\`

   }

 }

);

const kpis \= await response.json();

console.log(kpis);

---

## **Posibles respuestas de error** {#posibles-respuestas-de-error}

### **401 Unauthorized** {#401-unauthorized}

El token no fue enviado o es inválido.

{

 "error": "Unauthorized"

}

Solución: el usuario debe volver a iniciar sesión.

---

### **500 Internal Server Error** {#500-internal-server-error}

Error interno del backend.

{

 "error": "Error interno del servidor"

}

---

## **Uso esperado en la UI** {#uso-esperado-en-la-ui}

Estos KPIs pueden utilizarse para mostrar métricas del sprint, por ejemplo:

* progreso del sprint  
* porcentaje de tareas a tiempo  
* desviación entre horas estimadas y reales  
* métricas para dashboards del proyecto

---

**Sugerencia para el frontend**

Con estos datos pueden calcular métricas visuales como:

% cumplimiento \= (aTiempo / tareasCompletadas) \* 100

o

desviación \= totalRealHrs \- totalEstimadoHrs

# **Rendimiento Comparativo por Desarrollador** {#rendimiento-comparativo-por-desarrollador}

## **Descripción** {#descripción-4}

Este endpoint proporciona métricas de rendimiento por desarrollador dentro de un proyecto.

Los datos permiten construir visualizaciones de productividad como:

* **Leaderboard de desarrolladores**  
* **Gráfica de tendencia por sprint (multi-line chart)**  
* **Mapa de calor de productividad (heatmap)**

Las métricas se calculan a partir de las tareas asignadas a cada desarrollador dentro del proyecto.

KPIs cubiertos:

* **KPI 5:** porcentaje de tareas completadas vs asignadas  
* **KPI 6:** número de tareas completadas por sprint  
* **KPI 7:** horas reales invertidas por sprint

---

## **Ruta** {#ruta}

GET /api/projects/{projectId}/developers/performance

Ejemplo:

GET /api/projects/4F4F7319A8AB0A0AE063F862000A61C1/developers/performance

---

## **Parámetros** {#parámetros}

### **Path parameters** {#path-parameters}

| Parámetro | Tipo | Descripción |
| ----- | ----- | ----- |
| projectId | UUID (HEX) | Identificador del proyecto |

Ejemplo:

4F4F7319A8AB0A0AE063F862000A61C1

---

## **Autenticación** {#autenticación-2}

Este endpoint requiere autenticación mediante **JWT**.

Header requerido:

Authorization: Bearer \<TOKEN\>

El token se obtiene con:

POST /auth/login

---

## **Ejemplo de Request** {#ejemplo-de-request-1}

TOKEN=$(curl \-s \-X POST http://localhost:8080/auth/login \\

\-H "Content-Type: application/json" \\

\-d '{"email":"a01220835@tec.mx","password":"Admin123"}' \\

| jq \-r '.token')

curl http://localhost:8080/api/projects/4F4F7319A8AB0A0AE063F862000A61C1/developers/performance \\

\-H "Authorization: Bearer $TOKEN"

---

## **Ejemplo de Response** {#ejemplo-de-response-1}

\[

 {

   "userId": "4F4A89EAE990C780E063F862000A17FA",

   "nombre": "Emilio Hernandez",

   "rendimientoGlobal": {

     "asignadas": 7,

     "completadas": 2,

     "porcentajeCompletadas": 28.57

   },

   "historicoSprints": \[

     {

       "sprintId": "4F4F7319A8AC0A0AE063F862000A61C1",

       "sprintNombre": "Sprint 1",

       "tareasTerminadas": 1,

       "horasReales": 4.0

     },

     {

       "sprintId": "4F5966128E5C573CE063F862000A0FBA",

       "sprintNombre": "Sprint 2",

       "tareasTerminadas": 1,

       "horasReales": 9.0

     }

   \]

 },

 {

   "userId": "C58397F46CFC4AF69ED01B0FFD3505C1",

   "nombre": "Clay Gutierrez",

   "rendimientoGlobal": {

     "asignadas": 6,

     "completadas": 3,

     "porcentajeCompletadas": 50.0

   },

   "historicoSprints": \[

     {

       "sprintId": "4F4F7319A8AC0A0AE063F862000A61C1",

       "sprintNombre": "Sprint 1",

       "tareasTerminadas": 2,

       "horasReales": 11.0

     },

     {

       "sprintId": "4F5966128E5C573CE063F862000A0FBA",

       "sprintNombre": "Sprint 2",

       "tareasTerminadas": 1,

       "horasReales": 7.0

     }

   \]

 }

\]

---

## **Campos de respuesta** {#campos-de-respuesta-1}

### **Nivel desarrollador** {#nivel-desarrollador}

| Campo | Tipo | Descripción |
| ----- | ----- | ----- |
| userId | UUID | Identificador del desarrollador |
| nombre | String | Nombre completo del desarrollador |

---

### **Rendimiento global** {#rendimiento-global}

| Campo | Tipo | Descripción |
| ----- | ----- | ----- |
| asignadas | Integer | Número total de tareas asignadas |
| completadas | Integer | Número total de tareas completadas |
| porcentajeCompletadas | Decimal | Porcentaje de tareas completadas |

---

### **Histórico por sprint** {#histórico-por-sprint}

| Campo | Tipo | Descripción |
| ----- | ----- | ----- |
| sprintId | UUID | Identificador del sprint |
| sprintNombre | String | Nombre del sprint |
| tareasTerminadas | Integer | Número de tareas finalizadas en el sprint |
| horasReales | Decimal | Total de horas reales invertidas |

---

## **Uso esperado en frontend** {#uso-esperado-en-frontend}

Este endpoint alimenta múltiples visualizaciones del dashboard.

### **Leaderboard de desarrolladores** {#leaderboard-de-desarrolladores}

Usa:

rendimientoGlobal.porcentajeCompletadas

para ordenar desarrolladores por productividad.

---

### **Multi-line Chart (tendencia)** {#multi-line-chart-(tendencia)}

Usa:

historicoSprints\[\]

para graficar:

X → sprint

Y → tareasTerminadas

---

### **Heatmap de productividad** {#heatmap-de-productividad}

Usa:

historicoSprints\[\].horasReales

para representar intensidad de trabajo por sprint.

---

## **Resultado** {#resultado}

Con este endpoint el dashboard puede mostrar:

* ranking de desarrolladores  
* evolución de productividad por sprint  
* distribución de esfuerzo en horas

todo a partir de **una sola llamada al backend**.

# **Crear Equipo** {#crear-equipo}

## **Descripción** {#descripción-5}

Este endpoint permite crear un nuevo equipo dentro del sistema.  
 Un equipo representa un grupo de usuarios que colaboran en el desarrollo de proyectos.

Cuando se crea un equipo, el sistema registra automáticamente al usuario propietario del equipo como miembro del mismo. Esto asegura que el creador del equipo tenga acceso inmediato a las operaciones relacionadas con dicho equipo.

---

## **Ruta** {#ruta-1}

POST /api/teams

---

## **Autenticación** {#autenticación-3}

Este endpoint requiere autenticación mediante **JWT**.

El token debe enviarse en el header:

Authorization: Bearer \<TOKEN\>

El token se obtiene mediante el endpoint de autenticación:

POST /auth/login

---

## **Body (JSON)** {#body-(json)}

{

 "nombre": "Equipo Backend",

 "descripcion": "Equipo encargado del backend",

 "ownerId": "C58397F46CFC4AF69ED01B0FFD3505C1"

}

---

## **Campos del Body** {#campos-del-body}

| Campo | Tipo | Descripción |
| ----- | ----- | ----- |
| nombre | string | Nombre del equipo |
| descripcion | string | Descripción del equipo |
| ownerId | string | Identificador del usuario que será propietario del equipo |

---

## **Ejemplo de Request** {#ejemplo-de-request-2}

curl \-X POST http://localhost:8080/api/teams \\

\-H "Content-Type: application/json" \\

\-H "Authorization: Bearer \<TOKEN\>" \\

\-d '{

 "nombre": "Equipo Backend",

 "descripcion": "Equipo encargado del backend",

 "ownerId": "C58397F46CFC4AF69ED01B0FFD3505C1"

}'

---

## **Ejemplo de Response** {#ejemplo-de-response-2}

{

 "teamId": "0873592DFFF242FD9CDFD4EE021350EF",

 "nombre": "Equipo Backend",

 "descripcion": "Equipo encargado del backend",

 "ownerId": "C58397F46CFC4AF69ED01B0FFD3505C1"

}

---

## **Campos de Respuesta** {#campos-de-respuesta-2}

| Campo | Tipo | Descripción |
| ----- | ----- | ----- |
| teamId | string | Identificador único del equipo generado por el sistema |
| nombre | string | Nombre del equipo |
| descripcion | string | Descripción del equipo |
| ownerId | string | Identificador del usuario propietario del equipo |

---

## **Comportamiento del sistema** {#comportamiento-del-sistema}

Al ejecutarse este endpoint:

* Se crea un nuevo registro en la tabla **EQUIPO**.  
* Se genera automáticamente un **TEAM\_ID**.  
* El usuario indicado como propietario del equipo se registra también como miembro en la tabla **USUARIO\_A\_EQUIPO**.

---

## **Uso esperado en el frontend** {#uso-esperado-en-el-frontend}

Este endpoint será utilizado en las funcionalidades de administración de equipos, permitiendo:

* Crear nuevos equipos de trabajo  
* Asignar un usuario propietario  
* Organizar a los desarrol\`ladores dentro del sistema antes de asignarlos a proyectos 

# **Obtener Equipos** {#obtener-equipos}

### **Descripción** {#descripción-6}

Este endpoint permite obtener la lista de todos los equipos registrados en el sistema.  
 Es utilizado para visualizar los equipos disponibles y seleccionar uno para su gestión o consulta.

---

### **Ruta** {#ruta-2}

GET /api/teams

---

### **Autenticación** {#autenticación-4}

Este endpoint requiere autenticación mediante JWT.

Header requerido:

Authorization: Bearer \<TOKEN\>

---

### **Ejemplo de Request** {#ejemplo-de-request-3}

curl http://localhost:8080/api/teams \\

\-H "Authorization: Bearer \<TOKEN\>"

---

### **Ejemplo de Response** {#ejemplo-de-response-3}

\[

 {

   "teamId": "0873592DFFF242FD9CDFD4EE021350EF",

   "nombre": "Equipo Backend Prueba",

   "descripcion": "Equipo encargado del backend",

   "ownerId": "C58397F46CFC4AF69ED01B0FFD3505C1"

 },

 {

   "teamId": "4F4F6EABD376049BE063F862000A3809",

   "nombre": "Equipo 43",

   "descripcion": "Equipo encargado del desarrollo del proyecto",

   "ownerId": "4F4A89EAE990C780E063F862000A17FA"

 }

\]

---

### **Campos de Respuesta** {#campos-de-respuesta-3}

| Campo | Tipo | Descripción |
| ----- | ----- | ----- |
| teamId | string | Identificador único del equipo |
| nombre | string | Nombre del equipo |
| descripcion | string | Descripción del equipo |
| ownerId | string | Identificador del propietario del equipo |

---

### **Uso esperado en el frontend** {#uso-esperado-en-el-frontend-1}

Este endpoint permite:

* Mostrar listado de equipos  
* Seleccionar un equipo activo  
* Navegar entre equipos del sistema

---

# **Obtener Equipo por ID** {#obtener-equipo-por-id}

### **Descripción** {#descripción-7}

Este endpoint permite obtener la información de un equipo específico a partir de su identificador.

---

### **Ruta** {#ruta-3}

GET /api/teams/{teamId}

---

### **Parámetros** {#parámetros-1}

| Parámetro | Tipo | Descripción |
| ----- | ----- | ----- |
| teamId | string | Identificador del equipo |

---

### **Autenticación** {#autenticación-5}

Authorization: Bearer \<TOKEN\>

---

### **Ejemplo de Request** {#ejemplo-de-request-4}

curl http://localhost:8080/api/teams/0873592DFFF242FD9CDFD4EE021350EF \\

\-H "Authorization: Bearer \<TOKEN\>"

---

### **Ejemplo de Response** {#ejemplo-de-response-4}

{

 "teamId": "0873592DFFF242FD9CDFD4EE021350EF",

 "nombre": "Equipo Backend Prueba",

 "descripcion": "Equipo encargado del backend",

 "ownerId": "C58397F46CFC4AF69ED01B0FFD3505C1"

}

---

### **Uso esperado en el frontend** {#uso-esperado-en-el-frontend-2}

Permite:

* Mostrar detalles de un equipo  
* Cargar información para edición o visualización

---

# **Obtener Miembros del Equipo** {#obtener-miembros-del-equipo}

### **Descripción** {#descripción-8}

Este endpoint permite obtener la lista de usuarios que pertenecen a un equipo específico.

Incluye automáticamente al usuario propietario del equipo.

---

### **Ruta** {#ruta-4}

GET /api/teams/{teamId}/members

---

### **Ejemplo de Request** {#ejemplo-de-request-5}

curl http://localhost:8080/api/teams/0873592DFFF242FD9CDFD4EE021350EF/members \\

\-H "Authorization: Bearer \<TOKEN\>"

---

### **Ejemplo de Response** {#ejemplo-de-response-5}

\[

 {

   "teamId": "0873592DFFF242FD9CDFD4EE021350EF",

   "userId": "C58397F46CFC4AF69ED01B0FFD3505C1"

 }

\]

---

### **Campos de Respuesta** {#campos-de-respuesta-4}

| Campo | Tipo | Descripción |
| ----- | ----- | ----- |
| teamId | string | Identificador del equipo |
| userId | string | Identificador del usuario miembro |

---

### **Uso esperado en el frontend** {#uso-esperado-en-el-frontend-3}

Permite:

* Mostrar integrantes del equipo  
* Construir listas de desarrolladores disponibles  
* Asignar tareas o roles

---

# **Agregar Miembro al Equipo** {#agregar-miembro-al-equipo}

### **Descripción** {#descripción-9}

Este endpoint permite agregar un usuario existente como miembro de un equipo.

El sistema valida que el usuario no esté previamente asignado al equipo.

---

### **Ruta** {#ruta-5}

POST /api/teams/{teamId}/members/{userId}

---

### **Ejemplo de Request** {#ejemplo-de-request-6}

curl \-X POST http://localhost:8080/api/teams/0873592DFFF242FD9CDFD4EE021350EF/members/4F4A89EAE990C780E063F862000A17FA \\

\-H "Authorization: Bearer \<TOKEN\>"

---

### **Respuesta** {#respuesta-6}

201 Created

---

### **Error posible** {#error-posible}

{

 "error": "User already in team"

}

---

### **Uso esperado en el frontend** {#uso-esperado-en-el-frontend-4}

Permite:

* Agregar desarrolladores a un equipo  
* Gestionar la composición del equipo

---

# **Eliminar Miembro del Equipo** {#eliminar-miembro-del-equipo}

### **Descripción** {#descripción-10}

Este endpoint permite eliminar a un usuario de un equipo.

---

### **Ruta** {#ruta-6}

DELETE /api/teams/{teamId}/members/{userId}

---

### **Ejemplo de Request** {#ejemplo-de-request-7}

curl \-X DELETE http://localhost:8080/api/teams/0873592DFFF242FD9CDFD4EE021350EF/members/4F4A89EAE990C780E063F862000A17FA \\

\-H "Authorization: Bearer \<TOKEN\>"

---

### **Respuesta** {#respuesta-7}

204 No Content

---

### **Uso esperado en el frontend** {#uso-esperado-en-el-frontend-5}

Permite:

* Remover usuarios de un equipo  
* Mantener actualizado el equipo de trabajo 

# **Crear Proyecto** {#crear-proyecto}

### **Descripción** {#descripción-11}

Este endpoint permite crear un nuevo proyecto asociado a un equipo existente.

Un proyecto representa una unidad de trabajo dentro del sistema, sobre la cual se organizan sprints, tareas y métricas de desempeño.

El progreso del proyecto no es definido manualmente, sino que es calculado automáticamente por el sistema a partir del avance de sus tareas.

---

### **Ruta** {#ruta-7}

POST /api/teams/{teamId}/projects

---

### **Parámetros** {#parámetros-2}

| Parámetro | Tipo | Descripción |
| ----- | ----- | ----- |
| teamId | string | Identificador del equipo al que pertenece el proyecto |

---

### **Autenticación** {#autenticación-6}

Authorization: Bearer \<TOKEN\>

---

### **Body (JSON)** {#body-(json)-1}

{

 "nombre": "Proyecto KPI Dashboard",

 "descripcion": "Sistema de métricas",

 "fechaInicio": "2026-04-15T10:00:00",

 "fechaFin": "2026-05-01T18:00:00"

}

---

### **Campos del Body** {#campos-del-body-1}

| Campo | Tipo | Descripción |
| ----- | ----- | ----- |
| nombre | string | Nombre del proyecto |
| descripcion | string | Descripción del proyecto |
| fechaInicio | string | Fecha de inicio en formato ISO 8601 |
| fechaFin | string | Fecha de finalización esperada en formato ISO 8601 |

---

### **Ejemplo de Response** {#ejemplo-de-response-6}

{

 "projectId": "DD145735C71748A08451301333982723",

 "nombre": "Proyecto KPI Dashboard",

 "descripcion": "Sistema de métricas",

 "fechaInicio": "2026-04-15T10:00",

 "fechaFin": "2026-05-01T18:00",

 "progreso": 0.0,

 "teamId": "0873592DFFF242FD9CDFD4EE021350EF"

}

---

### **Comportamiento del sistema** {#comportamiento-del-sistema-1}

* Se crea un nuevo registro en la tabla **PROYECTO**  
* Se asigna automáticamente un `PROJECT_ID`  
* El campo `PROGRESO` se inicializa en `0.0`  
* El proyecto queda asociado al equipo indicado

---

### **Uso esperado en el frontend** {#uso-esperado-en-el-frontend-6}

* Crear nuevos proyectos dentro de un equipo  
* Inicializar dashboards de seguimiento  
* Definir el contexto de trabajo para tareas y sprints

---

# **Obtener Proyectos por Equipo** {#obtener-proyectos-por-equipo}

### **Descripción** {#descripción-12}

Este endpoint permite obtener todos los proyectos asociados a un equipo específico.

---

### **Ruta** {#ruta-8}

GET /api/teams/{teamId}/projects

---

### **Ejemplo de Request** {#ejemplo-de-request-8}

curl http://localhost:8080/api/teams/{teamId}/projects \\

\-H "Authorization: Bearer \<TOKEN\>"

---

### **Ejemplo de Response** {#ejemplo-de-response-7}

\[

 {

   "projectId": "DD145735C71748A08451301333982723",

   "nombre": "Proyecto KPI Dashboard",

   "descripcion": "Sistema de métricas",

   "fechaInicio": "2026-04-15T10:00",

   "fechaFin": "2026-05-01T18:00",

   "progreso": 0.0,

   "teamId": "0873592DFFF242FD9CDFD4EE021350EF"

 }

\]

---

### **Uso esperado en el frontend** {#uso-esperado-en-el-frontend-7}

* Listar proyectos disponibles dentro de un equipo  
* Navegar entre proyectos  
* Seleccionar contexto de trabajo

---

# **Obtener Proyecto por ID** {#obtener-proyecto-por-id}

### **Descripción** {#descripción-13}

Permite obtener la información detallada de un proyecto específico.

---

### **Ruta** {#ruta-9}

GET /api/projects/{projectId}

---

### **Ejemplo de Response** {#ejemplo-de-response-8}

{

 "projectId": "DD145735C71748A08451301333982723",

 "nombre": "Proyecto KPI Dashboard",

 "descripcion": "Sistema de métricas",

 "fechaInicio": "2026-04-15T10:00",

 "fechaFin": "2026-05-01T18:00",

 "progreso": 0.0,

 "teamId": "0873592DFFF242FD9CDFD4EE021350EF"

}

---

### **Uso esperado en el frontend** {#uso-esperado-en-el-frontend-8}

* Mostrar detalle del proyecto  
* Cargar información para edición  
* Visualizar estado general

---

# **Actualizar Proyecto** {#actualizar-proyecto}

### **Descripción** {#descripción-14}

Permite modificar la información de un proyecto existente.

---

### **Ruta** {#ruta-10}

PUT /api/projects/{projectId}

---

### **Body (JSON)** {#body-(json)-2}

{

 "nombre": "Proyecto KPI Dashboard v2",

 "descripcion": "Actualizado",

 "fechaInicio": "2026-04-15T10:00:00",

 "fechaFin": "2026-05-10T18:00:00"

}

---

### **Restricciones** {#restricciones}

* No se puede modificar el `teamId`  
* El campo `progreso` no es editable manualmente

---

### **Uso esperado en el frontend** {#uso-esperado-en-el-frontend-9}

* Editar información del proyecto  
* Ajustar fechas o descripción

---

# **Eliminar Proyecto** {#eliminar-proyecto}

### **Descripción** {#descripción-15}

Permite eliminar un proyecto existente.

---

### **Ruta** {#ruta-11}

DELETE /api/projects/{projectId}

---

### **Restricciones** {#restricciones-1}

* El proyecto solo puede eliminarse si no tiene miembros asociados en la tabla **USUARIO\_A\_PROYECTO**

---

### **Respuesta** {#respuesta-8}

204 No Content

---

### **Uso esperado en el frontend** {#uso-esperado-en-el-frontend-10}

* Eliminar proyectos vacíos  
* Limpieza de proyectos no utilizados

---

# **Obtener Progreso del Proyecto** {#obtener-progreso-del-proyecto}

### **Descripción** {#descripción-16}

Este endpoint devuelve el porcentaje de avance de un proyecto.

El progreso es calculado automáticamente por el sistema en base al estado de las tareas asociadas.

---

### **Ruta** {#ruta-12}

GET /api/projects/{projectId}/progress

---

### **Ejemplo de Response** {#ejemplo-de-response-9}

{

 "projectId": "DD145735C71748A08451301333982723",

 "progress": 0.0

}

---

### **Uso esperado en el frontend** {#uso-esperado-en-el-frontend-11}

* Mostrar gauges de progreso  
* Alimentar dashboards  
* Visualizar avance general del proyecto 

# **Obtener Miembros de un Proyecto** {#obtener-miembros-de-un-proyecto}

### **Descripción** {#descripción-17}

Este endpoint permite obtener la lista de usuarios asignados a un proyecto específico.

Los miembros del proyecto representan los desarrolladores que participan activamente en la ejecución del mismo.

---

### **Ruta** {#ruta-13}

GET /api/projects/{projectId}/members

---

### **Parámetros** {#parámetros-3}

| Parámetro | Tipo | Descripción |
| ----- | ----- | ----- |
| projectId | string | Identificador del proyecto |

---

### **Autenticación** {#autenticación-7}

Authorization: Bearer \<TOKEN\>

---

### **Ejemplo de Request** {#ejemplo-de-request-9}

curl http://localhost:8080/api/projects/172D40A8807F41049282EA913C26C27E/members \\

\-H "Authorization: Bearer \<TOKEN\>"

---

### **Ejemplo de Response** {#ejemplo-de-response-10}

\[

 {

   "projectId": "172D40A8807F41049282EA913C26C27E",

   "userId": "C58397F46CFC4AF69ED01B0FFD3505C1"

 }

\]

---

### **Campos de Respuesta** {#campos-de-respuesta-5}

| Campo | Tipo | Descripción |
| ----- | ----- | ----- |
| projectId | string | Identificador del proyecto |
| userId | string | Identificador del usuario miembro |

---

### **Uso esperado en el frontend** {#uso-esperado-en-el-frontend-12}

* Mostrar lista de desarrolladores asignados al proyecto  
* Poblar listas de selección para asignación de tareas  
* Visualizar equipo de trabajo del proyecto

---

# **Agregar Miembro a un Proyecto** {#agregar-miembro-a-un-proyecto}

### **Descripción** {#descripción-18}

Este endpoint permite asignar un usuario a un proyecto.

Antes de realizar la asignación, el sistema valida que el usuario pertenezca al equipo asociado al proyecto.

---

### **Ruta** {#ruta-14}

POST /api/projects/{projectId}/members/{userId}

---

### **Parámetros** {#parámetros-4}

| Parámetro | Tipo | Descripción |
| ----- | ----- | ----- |
| projectId | string | Identificador del proyecto |
| userId | string | Identificador del usuario |

---

### **Autenticación** {#autenticación-8}

Authorization: Bearer \<TOKEN\>

---

### **Ejemplo de Request** {#ejemplo-de-request-10}

curl \-X POST http://localhost:8080/api/projects/172D40A8807F41049282EA913C26C27E/members/C58397F46CFC4AF69ED01B0FFD3505C1 \\

\-H "Authorization: Bearer \<TOKEN\>"

---

### **Respuesta** {#respuesta-9}

201 Created

---

### **Validaciones del sistema** {#validaciones-del-sistema}

* El usuario no debe estar previamente asignado al proyecto  
* El usuario debe pertenecer al equipo del proyecto

---

### **Errores posibles** {#errores-posibles}

{

 "error": "User already in project"

}

{

 "error": "User does not belong to the project's team"

}

---

### **Comportamiento del sistema** {#comportamiento-del-sistema-2}

* Se crea un registro en la tabla **USUARIO\_A\_PROYECTO**  
* Se establece la relación entre el usuario y el proyecto

---

### **Uso esperado en el frontend** {#uso-esperado-en-el-frontend-13}

* Asignar desarrolladores a proyectos  
* Construir equipos de trabajo  
* Controlar acceso a funcionalidades del proyecto

---

# **Eliminar Miembro de un Proyecto** {#eliminar-miembro-de-un-proyecto}

### **Descripción** {#descripción-19}

Este endpoint permite eliminar la asignación de un usuario dentro de un proyecto.

---

### **Ruta** {#ruta-15}

DELETE /api/projects/{projectId}/members/{userId}

---

### **Parámetros** {#parámetros-5}

| Parámetro | Tipo | Descripción |
| ----- | ----- | ----- |
| projectId | string | Identificador del proyecto |
| userId | string | Identificador del usuario |

---

### **Autenticación** {#autenticación-9}

Authorization: Bearer \<TOKEN\>

---

### **Ejemplo de Request** {#ejemplo-de-request-11}

curl \-X DELETE http://localhost:8080/api/projects/172D40A8807F41049282EA913C26C27E/members/C58397F46CFC4AF69ED01B0FFD3505C1 \\

\-H "Authorization: Bearer \<TOKEN\>"

---

### **Respuesta** {#respuesta-10}

204 No Content

---

### **Validaciones del sistema** {#validaciones-del-sistema-1}

* El usuario debe estar asignado al proyecto

---

### **Error posible** {#error-posible-1}

{

 "error": "Member not found in project"

}

---

### **Comportamiento del sistema** {#comportamiento-del-sistema-3}

* Se elimina el registro correspondiente en la tabla **USUARIO\_A\_PROYECTO**  
* Se rompe la relación entre usuario y proyecto

---

### **Uso esperado en el frontend** {#uso-esperado-en-el-frontend-14}

* Remover desarrolladores de un proyecto  
* Reorganizar equipos de trabajo  
* Controlar asignaciones activas 

# **Crear Sprint** {#crear-sprint}

## **Descripción** {#descripción-20}

Este endpoint permite crear un nuevo sprint dentro de un proyecto.

Un sprint representa un intervalo de tiempo en el cual se planifican y ejecutan tareas.  
 El sistema valida que no existan conflictos de fechas con otros sprints del mismo proyecto, asegurando una planificación coherente.

---

## **Ruta** {#ruta-16}

POST /api/projects/{projectId}/sprints

---

## **Parámetros** {#parámetros-6}

| Parámetro | Tipo | Descripción |
| ----- | ----- | ----- |
| projectId | string | Identificador del proyecto |

---

## **Autenticación** {#autenticación-10}

Authorization: Bearer \<TOKEN\>

---

## **Body (JSON)** {#body-(json)-3}

{

 "nombre": "Sprint 1",

 "fechaInicio": "2026-04-01T00:00:00",

 "fechaFin": "2026-04-10T23:59:59"

}

---

## **Campos del Body** {#campos-del-body-2}

| Campo | Tipo | Descripción |
| ----- | ----- | ----- |
| nombre | string | Nombre del sprint |
| fechaInicio | string | Fecha de inicio (ISO 8601\) |
| fechaFin | string | Fecha de fin (ISO 8601\) |

---

## **Ejemplo de Request** {#ejemplo-de-request-12}

curl \-X POST http://localhost:8080/api/projects/70BD1C78282D46BF913A573354FA3D55/sprints \\

\-H "Content-Type: application/json" \\

\-H "Authorization: Bearer \<TOKEN\>" \\

\-d '{

 "nombre": "Sprint 1",

 "fechaInicio": "2026-04-01T00:00:00",

 "fechaFin": "2026-04-10T23:59:59"

}'

---

## **Ejemplo de Response** {#ejemplo-de-response-11}

{

 "sprintId": "A25A41F7525348FCA3DFB665F1E5CA58",

 "nombre": "Sprint 1",

 "fechaInicio": "2026-04-01T00:00:00",

 "fechaFin": "2026-04-10T23:59:59",

 "projectId": "172D40A8807F41049282EA913C26C27E"

}

---

## **Validaciones del sistema** {#validaciones-del-sistema-2}

* `fechaInicio` debe ser menor que `fechaFin`  
* No debe existir traslape con otros sprints del mismo proyecto

---

## **Error posible** {#error-posible-2}

{

 "error": "Sprint dates overlap with existing sprint"

}

---

## **Comportamiento del sistema** {#comportamiento-del-sistema-4}

* Inserta un nuevo registro en la tabla **SPRINT**  
* Genera automáticamente el `SPRINT_ID`  
* Valida integridad temporal dentro del proyecto

---

## **Uso esperado en el frontend** {#uso-esperado-en-el-frontend-15}

* Crear iteraciones de trabajo  
* Planificación de tareas por periodos  
* Base para gráficas de evolución y KPIs

---

# **Obtener Sprints de un Proyecto** {#obtener-sprints-de-un-proyecto}

## **Descripción** {#descripción-21}

Este endpoint devuelve la lista de sprints asociados a un proyecto.

---

## **Ruta** {#ruta-17}

GET /api/projects/{projectId}/sprints

---

## **Parámetros** {#parámetros-7}

| Parámetro | Tipo | Descripción |
| ----- | ----- | ----- |
| projectId | string | Identificador del proyecto |

---

## **Autenticación** {#autenticación-11}

Authorization: Bearer \<TOKEN\>

---

## **Ejemplo de Request** {#ejemplo-de-request-13}

curl http://localhost:8080/api/projects/{projectId}/sprints \\

\-H "Authorization: Bearer \<TOKEN\>"

---

## **Ejemplo de Response** {#ejemplo-de-response-12}

\[

 {

   "sprintId": "A25A41F7525348FCA3DFB665F1E5CA58",

   "nombre": "Sprint 1",

   "fechaInicio": "2026-04-01T00:00:00",

   "fechaFin": "2026-04-10T23:59:59",

   "projectId": "172D40A8807F41049282EA913C26C27E"

 }

\]

---

## **Uso esperado en el frontend** {#uso-esperado-en-el-frontend-16}

* Mostrar timeline del proyecto  
* Poblar selects de sprint en tareas  
* Construcción de dashboards

---

# **Obtener Sprint por ID** {#obtener-sprint-por-id}

## **Descripción** {#descripción-22}

Permite obtener la información detallada de un sprint específico.

---

## **Ruta** {#ruta-18}

GET /api/sprints/{sprintId}

---

## **Parámetros** {#parámetros-8}

| Parámetro | Tipo | Descripción |
| ----- | ----- | ----- |
| sprintId | string | Identificador del sprint |

---

## **Autenticación** {#autenticación-12}

Authorization: Bearer \<TOKEN\>

---

## **Ejemplo de Request** {#ejemplo-de-request-14}

curl http://localhost:8080/api/sprints/{sprintId} \\

\-H "Authorization: Bearer \<TOKEN\>"

---

## **Ejemplo de Response** {#ejemplo-de-response-13}

{

 "sprintId": "03BA43D2AD304E00832052EF6CC54723",

 "nombre": "Sprint 2",

 "fechaInicio": "2026-04-11T00:00:00",

 "fechaFin": "2026-04-20T23:59:59",

 "projectId": "172D40A8807F41049282EA913C26C27E"

}

---

## **Uso esperado en el frontend** {#uso-esperado-en-el-frontend-17}

* Visualizar detalles del sprint  
* Edición de información

---

# **Actualizar Sprint** {#actualizar-sprint}

## **Descripción** {#descripción-23}

Permite modificar la información de un sprint existente.

El sistema valida nuevamente que no existan conflictos de fechas con otros sprints.

---

## **Ruta** {#ruta-19}

PUT /api/sprints/{sprintId}

---

## **Parámetros** {#parámetros-9}

| Parámetro | Tipo | Descripción |
| ----- | ----- | ----- |
| sprintId | string | Identificador del sprint |

---

## **Body (JSON)** {#body-(json)-4}

{

 "nombre": "Sprint actualizado",

 "fechaInicio": "2026-04-01T00:00:00",

 "fechaFin": "2026-04-12T23:59:59"

}

---

## **Ejemplo de Request** {#ejemplo-de-request-15}

curl \-X PUT http://localhost:8080/api/sprints/{sprintId} \\

\-H "Content-Type: application/json" \\

\-H "Authorization: Bearer \<TOKEN\>" \\

\-d '{

 "nombre": "Sprint actualizado",

 "fechaInicio": "2026-04-01T00:00:00",

 "fechaFin": "2026-04-12T23:59:59"

}'

---

## **Error posible** {#error-posible-3}

{

 "error": "Sprint dates overlap with existing sprint"

}

---

## **Comportamiento del sistema** {#comportamiento-del-sistema-5}

* Actualiza el sprint en la base de datos  
* Revalida restricciones temporales

---

## **Uso esperado en el frontend** {#uso-esperado-en-el-frontend-18}

* Ajustar planificación  
* Reprogramar iteraciones

---

# **Eliminar Sprint** {#eliminar-sprint}

## **Descripción** {#descripción-24}

Permite eliminar un sprint del sistema.

---

## **Ruta** {#ruta-20}

DELETE /api/sprints/{sprintId}

---

## **Parámetros** {#parámetros-10}

| Parámetro | Tipo | Descripción |
| ----- | ----- | ----- |
| sprintId | string | Identificador del sprint |

---

## **Autenticación** {#autenticación-13}

Authorization: Bearer \<TOKEN\>

---

## **Ejemplo de Request** {#ejemplo-de-request-16}

curl \-X DELETE http://localhost:8080/api/sprints/{sprintId} \\

\-H "Authorization: Bearer \<TOKEN\>"

---

## **Validaciones del sistema** {#validaciones-del-sistema-3}

* No se permite eliminar un sprint si tiene tareas asociadas

---

## **Error posible** {#error-posible-4}

{

 "error": "Cannot delete sprint with tasks"

}

---

## **Comportamiento del sistema** {#comportamiento-del-sistema-6}

* Elimina el registro de la tabla **SPRINT**  
* Mantiene integridad con la tabla **TAREA**

---

## **Uso esperado en el frontend** {#uso-esperado-en-el-frontend-19}

* Eliminar iteraciones vacías  
* Reorganizar planificación del proyecto 

# **Crear Tarea** {#crear-tarea}

### **Descripción** {#descripción-25}

Este endpoint permite crear una nueva tarea dentro de un proyecto.

Una tarea representa una unidad de trabajo que puede ser asignada a un sprint y posteriormente a uno o varios desarrolladores.  
 Al momento de su creación, la tarea inicia con estado **pendiente (estadoId \= 1\)** y sin fecha de finalización.

---

### **Ruta** {#ruta-21}

POST /api/projects/{projectId}/tasks

---

### **Autenticación** {#autenticación-14}

Requiere JWT:

Authorization: Bearer \<TOKEN\>

---

### **Body (JSON)** {#body-(json)-5}

{

 "titulo": "Task QA completa",

 "descripcion": "Pruebas end-to-end",

 "fechaLimite": "2026-04-30T23:59:59",

 "prioridadId": 2,

 "sprintId": "03BA43D2AD304E00832052EF6CC54723",

 "tiempoEstimado": 6

}

---

### **Campos del Body** {#campos-del-body-3}

| Campo | Tipo | Descripción |
| ----- | ----- | ----- |
| titulo | string | Título de la tarea |
| descripcion | string | Descripción opcional |
| fechaLimite | string | Fecha límite (ISO-8601) |
| prioridadId | int | Prioridad de la tarea |
| sprintId | string | Sprint asociado (opcional) |
| tiempoEstimado | double | Tiempo estimado en horas |

---

### **Ejemplo de Response** {#ejemplo-de-response-14}

{

 "taskId": "8D3C3DA1915241B0BD7BD0948F7DF9EE",

 "titulo": "Task QA completa",

 "descripcion": "Pruebas end-to-end",

 "estadoId": 1,

 "fechaCreacion": "2026-04-14T17:51:57",

 "fechaLimite": "2026-04-30T23:59:59",

 "fechaFinalizacion": null,

 "prioridadId": 2,

 "projectId": "172D40A8807F41049282EA913C26C27E",

 "sprintId": "03BA43D2AD304E00832052EF6CC54723",

 "tiempoEstimado": 6.0,

 "tiempoReal": 0.0

}

---

### **Comportamiento del sistema** {#comportamiento-del-sistema-7}

✔ Se genera automáticamente TASK\_ID

✔ Se asigna estado inicial \= 1 (pendiente)

✔ Se establece fecha de creación automáticamente

✔ Se inicializa tiempoReal \= 0

✔ Se valida que fechaLimite sea futura

---

# **Obtener tareas por proyecto** {#obtener-tareas-por-proyecto}

### **Ruta** {#ruta-22}

GET /api/projects/{projectId}/tasks

---

### **Descripción** {#descripción-26}

Obtiene todas las tareas asociadas a un proyecto específico.

---

### **Ejemplo de Response** {#ejemplo-de-response-15}

\[

 {

   "taskId": "...",

   "titulo": "...",

   "estadoId": 1

 }

\]

---

# **Obtener tarea por ID** {#obtener-tarea-por-id}

### **Ruta** {#ruta-23}

GET /api/tasks/{taskId}

---

### **Descripción** {#descripción-27}

Obtiene el detalle completo de una tarea específica.

---

# **Actualizar tarea** {#actualizar-tarea}

### **Ruta** {#ruta-24}

PUT /api/tasks/{taskId}

---

### **Descripción** {#descripción-28}

Permite actualizar los datos principales de una tarea.

---

### **Ejemplo Body** {#ejemplo-body}

{

 "titulo": "Task QA actualizada",

 "descripcion": "Update test",

 "fechaLimite": "2026-05-05T23:59:59",

 "prioridadId": 3,

 "sprintId": "03BA43D2AD304E00832052EF6CC54723",

 "tiempoEstimado": 10

}

---

### **Comportamiento** {#comportamiento}

✔ Mantiene fechaCreacion original

✔ Valida fechas

✔ Permite cambiar sprint

---

# **Cambiar estado de tarea** {#cambiar-estado-de-tarea}

### **Ruta** {#ruta-25}

PATCH /api/tasks/{taskId}/status?estadoId={id}

---

### **Descripción** {#descripción-29}

Permite cambiar el estado de la tarea.

---

### **Estados relevantes** {#estados-relevantes}

| Estado | Descripción |
| ----- | ----- |
| 1 | Pendiente |
| 2 | En progreso |
| 3 | Completada |

---

### **Comportamiento del sistema** {#comportamiento-del-sistema-8}

✔ Si estado \= 3 → se asigna fechaFinalizacion

✔ Si cambia a otro estado → se limpia fechaFinalizacion

✔ Dispara trigger de progreso en proyecto

---

# **Obtener progreso del proyecto (impacto indirecto)** {#obtener-progreso-del-proyecto-(impacto-indirecto)}

### **Ruta** {#ruta-26}

GET /api/projects/{projectId}/progress

---

### **Descripción** {#descripción-30}

Calcula el progreso del proyecto en función de las tareas completadas.

---

### **Ejemplo** {#ejemplo-5}

{

 "projectId": "172D40A8807F41049282EA913C26C27E",

 "progress": 33.33

}

---

### **Lógica** {#lógica}

progress \= (tareas completadas / total tareas) \* 100

---

# **Eliminar tarea** {#eliminar-tarea}

### **Ruta** {#ruta-27}

DELETE /api/tasks/{taskId}

---

### **Descripción** {#descripción-31}

Elimina una tarea del sistema.

---

### **Reglas de negocio** {#reglas-de-negocio}

✔ Se puede eliminar si NO está completada

❌ No se puede eliminar si estado \= 3

---

### **Ejemplo error** {#ejemplo-error}

{

 "error": "Cannot delete completed task"

}

# **Obtener usuarios asignados a una tarea** {#obtener-usuarios-asignados-a-una-tarea}

## **Ruta** {#ruta-28}

GET /api/tasks/{taskId}/users

## **Descripción** {#descripción-32}

Devuelve la lista de usuarios asignados a una tarea específica.

---

## **Ejemplo de Request** {#ejemplo-de-request-17}

curl http://localhost:8080/api/tasks/085466D17D864804A3866904CF57D434/users \\

\-H "Authorization: Bearer \<TOKEN\>"

---

## **Ejemplo de Response** {#ejemplo-de-response-16}

\[

 {

   "taskId": "085466D17D864804A3866904CF57D434",

   "userId": "C58397F46CFC4AF69ED01B0FFD3505C1"

 }

\]

---

## **Comportamiento del sistema** {#comportamiento-del-sistema-9}

* Consulta la tabla `USUARIO_A_TAREA`  
* Devuelve todos los usuarios asociados a la tarea  
* No modifica estado del sistema

---

# **Asignar usuario a tarea** {#asignar-usuario-a-tarea}

## **Ruta** {#ruta-29}

POST /api/tasks/{taskId}/users/{userId}

---

## **Descripción** {#descripción-33}

Asigna un usuario a una tarea específica.

---

## **Ejemplo de Request** {#ejemplo-de-request-18}

curl \-X POST http://localhost:8080/api/tasks/085466D17D864804A3866904CF57D434/users/C58397F46CFC4AF69ED01B0FFD3505C1 \\

\-H "Authorization: Bearer \<TOKEN\>"

---

## **Respuesta** {#respuesta-11}

HTTP 200 OK

---

## **Validaciones del sistema** {#validaciones-del-sistema-4}

Antes de realizar la asignación, el sistema valida:

### **1\. Existencia de la tarea** {#1.-existencia-de-la-tarea}

* La tarea debe existir en la base de datos

### **2\. Pertenencia al equipo del proyecto** {#2.-pertenencia-al-equipo-del-proyecto}

* Se obtiene el `projectId` desde la tarea  
* Se obtiene el `teamId` desde el proyecto  
* Se valida que el usuario pertenezca a ese equipo

Task → Project → Team → User

---

### **3\. No duplicidad** {#3.-no-duplicidad}

* Se verifica que el usuario no esté ya asignado a la tarea

---

## **Errores posibles** {#errores-posibles-1}

### **Usuario no pertenece al equipo** {#usuario-no-pertenece-al-equipo}

{

 "error": "User does not belong to the project's team"

}

---

### **Usuario ya asignado** {#usuario-ya-asignado}

{

 "error": "User already assigned to task"

}

---

### **Tarea no encontrada** {#tarea-no-encontrada}

{

 "error": "Task not found"

}

---

## **Comportamiento del sistema** {#comportamiento-del-sistema-10}

* Inserta un registro en `USUARIO_A_TAREA`  
* Relación persistente M:N entre usuario y tarea  
* No modifica otros datos del sistema

---

# **Remover usuario de tarea** {#remover-usuario-de-tarea}

## **Ruta** {#ruta-30}

DELETE /api/tasks/{taskId}/users/{userId}

---

## **Descripción** {#descripción-34}

Elimina la asignación de un usuario en una tarea.

---

## **Ejemplo de Request** {#ejemplo-de-request-19}

curl \-X DELETE http://localhost:8080/api/tasks/085466D17D864804A3866904CF57D434/users/C58397F46CFC4AF69ED01B0FFD3505C1 \\

\-H "Authorization: Bearer \<TOKEN\>"

---

## **Respuesta** {#respuesta-12}

HTTP 200 OK

---

## **Validaciones del sistema** {#validaciones-del-sistema-5}

* Verifica que la relación exista antes de eliminarla

---

## **Error posible** {#error-posible-5}

{

 "error": "User not assigned to task"

}

---

## **Comportamiento del sistema** {#comportamiento-del-sistema-11}

* Elimina el registro correspondiente en `USUARIO_A_TAREA`  
* No afecta otras relaciones ni datos

---

## **Reglas de negocio clave** {#reglas-de-negocio-clave}

---

## **1\. Integridad organizacional** {#1.-integridad-organizacional}

Un usuario solo puede ser asignado a tareas de proyectos pertenecientes a su equipo.

---

## **2\. No duplicidad** {#2.-no-duplicidad}

Una asignación única por usuario y tarea:

PK (USER\_ID, TASK\_ID)

---

## **3\. Relación indirecta validada** {#3.-relación-indirecta-validada}

TASK → PROJECT → TEAM → USER

Esto evita inconsistencias y asegura trazabilidad organizacional.

---

## **4\. Eliminación controlada** {#4.-eliminación-controlada}

No se permite eliminar una asignación inexistente.

---

## **Uso esperado en el frontend** {#uso-esperado-en-el-frontend-20}

Este módulo permite construir funcionalidades como:

* Asignación de desarrolladores a tareas  
* Visualización de responsables por tarea  
* Tableros tipo Kanban con responsables  
* Métricas de carga de trabajo por usuario  
* Base para KPIs de productividad 

# **Project Documents Upload Endpoint** {#project-documents-upload-endpoint}

Este endpoint permite subir un documento asociado a un proyecto.

El archivo se almacena en **Supabase Storage** dentro de una ruta organizada por `projectId`, y el backend guarda la metadata del documento en la tabla `PROYECTO_DOCUMENTO`.

## **Endpoint** {#endpoint-8}

POST /api/projects/{projectId}/documents

## **Path Parameter** {#path-parameter-1}

| Parameter | Type | Description |
| ----- | ----- | ----- |
| projectId | String UUID | Identificador único del proyecto |

Ejemplo:

/api/projects/70BD1C78-282D-46BF-913A-573354FA3D55/documents

## **Body** {#body}

Este endpoint usa `multipart/form-data`.

| Campo | Tipo | Requerido | Descripción |
| ----- | ----- | ----- | ----- |
| documentType | String | Sí | Tipo de documento asociado al proyecto |
| file | File | Sí | Archivo que se subirá al bucket de Supabase |

Valores permitidos para `documentType`:

SRS, WBS, DESIGN, REQUIREMENTS, OTHER

## **Autenticación** {#autenticación-15}

Este endpoint requiere autenticación mediante JWT Token.

Header requerido:

Authorization: Bearer \<JWT\_TOKEN\>

El token se obtiene previamente mediante el endpoint:

POST /auth/login

## **Ejemplo de Request** {#ejemplo-de-request-20}

curl \-X POST "http://localhost:8080/api/projects/70BD1C78-282D-46BF-913A-573354FA3D55/documents" \\

\-H "Authorization: Bearer \<JWT\_TOKEN\>" \\

\-F "documentType=SRS" \\

\-F "file=@/Users/cgh/Downloads/srs.pdf"

## **Ejemplo de Response** {#ejemplo-de-response-17}

{

 "documentId": "91b3c836-a41a-4467-b6f0-32b64c076f00",

 "projectId": "70bd1c78-282d-46bf-913a-573354fa3d55",

 "documentType": "SRS",

 "fileName": "srs.pdf",

 "fileUrl": "https://gykofshbdehooqbadjyq.supabase.co/storage/v1/object/public/Test/projects/70bd1c78-282d-46bf-913a-573354fa3d55/1777303334432-srs.pdf",

 "storagePath": "projects/70bd1c78-282d-46bf-913a-573354fa3d55/1777303334432-srs.pdf",

 "contentType": "application/pdf",

 "fileSizeBytes": 974188,

 "createdAt": "2026-04-27T15:22:17.109225216"

}

## **Campos de respuesta** {#campos-de-respuesta-6}

| Campo | Tipo | Descripción |
| ----- | ----- | ----- |
| documentId | UUID | Identificador único del documento registrado |
| projectId | UUID | Identificador del proyecto al que pertenece el documento |
| documentType | String | Tipo del documento cargado |
| fileName | String | Nombre original normalizado del archivo |
| fileUrl | String | URL pública del archivo en Supabase Storage |
| storagePath | String | Ruta interna del archivo dentro del bucket |
| contentType | String | Tipo MIME del archivo |
| fileSizeBytes | Long | Tamaño del archivo en bytes |
| createdAt | DateTime | Fecha y hora en que se registró el documento |

## **Ejemplo de uso en Frontend JavaScript** {#ejemplo-de-uso-en-frontend-javascript}

const token \= localStorage.getItem("token");

const projectId \= "70BD1C78-282D-46BF-913A-573354FA3D55";

const formData \= new FormData();

formData.append("documentType", "SRS");

formData.append("file", selectedFile);

const response \= await fetch(\`/api/projects/${projectId}/documents\`, {

 method: "POST",

 headers: {

   Authorization: \`Bearer ${token}\`

 },

 body: formData

});

const document \= await response.json();

console.log(document);

## **Posibles respuestas de error** {#posibles-respuestas-de-error-1}

### **400 Bad Request** {#400-bad-request}

El archivo no fue enviado, el `documentType` es inválido o el `projectId` no tiene formato UUID válido.

{

 "error": "Invalid document type: TEST. Allowed values: SRS, WBS, DESIGN, REQUIREMENTS, OTHER"

}

Solución: enviar un tipo de documento válido y un archivo en el campo `file`.

### **401 Unauthorized** {#401-unauthorized-1}

El token no fue enviado o es inválido.

{

 "error": "Unauthorized"

}

Solución: el usuario debe volver a iniciar sesión.

### **500 Internal Server Error** {#500-internal-server-error-1}

Error interno del backend, error al subir el archivo a Supabase Storage o error al guardar metadata en Oracle.

{

 "error": "Error interno del servidor"

}

## **Uso esperado en la UI** {#uso-esperado-en-la-ui-1}

Este endpoint se utiliza desde el modal de edición o detalle del proyecto para cargar documentos como:

SRS

WBS

documentos de requerimientos

documentos de diseño

otros anexos del proyecto

El archivo queda disponible para consulta y también puede ser utilizado posteriormente por el pipeline de IA para generar tareas sugeridas.

## **Sugerencia para el frontend** {#sugerencia-para-el-frontend}

El frontend debe enviar el archivo usando `FormData`, no JSON.

También se recomienda validar antes del request:

que exista un archivo seleccionado

que el tipo de documento sea válido

que el tamaño del archivo no sea excesivo

que el usuario tenga token activo

---

# **Project Documents List Endpoint** {#project-documents-list-endpoint}

Este endpoint permite consultar los documentos asociados a un proyecto.

El backend lee la metadata guardada en Oracle desde la tabla `PROYECTO_DOCUMENTO`. No descarga el archivo; únicamente devuelve sus datos registrados y la URL pública almacenada.

## **Endpoint** {#endpoint-9}

GET /api/projects/{projectId}/documents

## **Path Parameter** {#path-parameter-2}

| Parameter | Type | Description |
| ----- | ----- | ----- |
| projectId | String UUID | Identificador único del proyecto |

Ejemplo:

/api/projects/70BD1C78-282D-46BF-913A-573354FA3D55/documents

## **Query Parameter Opcional** {#query-parameter-opcional}

| Parameter | Type | Required | Description |
| ----- | ----- | ----- | ----- |
| documentType | String | No | Filtra documentos por tipo |

Valores permitidos:

SRS, WBS, DESIGN, REQUIREMENTS, OTHER

Ejemplo con filtro:

/api/projects/70BD1C78-282D-46BF-913A-573354FA3D55/documents?documentType=SRS

## **Autenticación** {#autenticación-16}

Este endpoint requiere autenticación mediante JWT Token.

Header requerido:

Authorization: Bearer \<JWT\_TOKEN\>

El token se obtiene previamente mediante el endpoint:

POST /auth/login

## **Ejemplo de Request** {#ejemplo-de-request-21}

curl \-X GET "http://localhost:8080/api/projects/70BD1C78-282D-46BF-913A-573354FA3D55/documents" \\

\-H "Authorization: Bearer \<JWT\_TOKEN\>"

## **Ejemplo de Request con filtro** {#ejemplo-de-request-con-filtro}

curl \-X GET "http://localhost:8080/api/projects/70BD1C78-282D-46BF-913A-573354FA3D55/documents?documentType=SRS" \\

\-H "Authorization: Bearer \<JWT\_TOKEN\>"

## **Ejemplo de Response** {#ejemplo-de-response-18}

\[

 {

   "documentId": "91b3c836-a41a-4467-b6f0-32b64c076f00",

   "projectId": "70bd1c78-282d-46bf-913a-573354fa3d55",

   "documentType": "SRS",

   "fileName": "srs.pdf",

   "fileUrl": "https://gykofshbdehooqbadjyq.supabase.co/storage/v1/object/public/Test/projects/70bd1c78-282d-46bf-913a-573354fa3d55/1777303334432-srs.pdf",

   "storagePath": "projects/70bd1c78-282d-46bf-913a-573354fa3d55/1777303334432-srs.pdf",

   "contentType": "application/pdf",

   "fileSizeBytes": 974188,

   "createdAt": "2026-04-27T15:22:17.109225"

 }

\]

Si el proyecto existe pero no tiene documentos registrados, la respuesta esperada es:

\[\]

## **Campos de respuesta** {#campos-de-respuesta-7}

| Campo | Tipo | Descripción |
| ----- | ----- | ----- |
| documentId | UUID | Identificador único del documento registrado |
| projectId | UUID | Identificador del proyecto al que pertenece el documento |
| documentType | String | Tipo del documento |
| fileName | String | Nombre del archivo |
| fileUrl | String | URL pública del archivo en Supabase Storage |
| storagePath | String | Ruta interna del archivo dentro del bucket |
| contentType | String | Tipo MIME del archivo |
| fileSizeBytes | Long | Tamaño del archivo en bytes |
| createdAt | DateTime | Fecha y hora en que el documento fue registrado |

## **Ejemplo de uso en Frontend JavaScript** {#ejemplo-de-uso-en-frontend-javascript-1}

const token \= localStorage.getItem("token");

const projectId \= "70BD1C78-282D-46BF-913A-573354FA3D55";

const response \= await fetch(\`/api/projects/${projectId}/documents\`, {

 headers: {

   Authorization: \`Bearer ${token}\`

 }

});

const documents \= await response.json();

console.log(documents);

## **Ejemplo de uso con filtro en Frontend JavaScript** {#ejemplo-de-uso-con-filtro-en-frontend-javascript}

const token \= localStorage.getItem("token");

const projectId \= "70BD1C78-282D-46BF-913A-573354FA3D55";

const response \= await fetch(

 \`/api/projects/${projectId}/documents?documentType=SRS\`,

 {

   headers: {

     Authorization: \`Bearer ${token}\`

   }

 }

);

const srsDocuments \= await response.json();

console.log(srsDocuments);

## **Posibles respuestas de error** {#posibles-respuestas-de-error-2}

### **400 Bad Request** {#400-bad-request-1}

El `projectId` tiene formato inválido o el tipo de documento no es permitido.

{

 "error": "Invalid UUID format: 70BD1C78282D46BF913A573354FA3D55"

}

Solución: enviar el `projectId` en formato UUID con guiones.

Ejemplo correcto:

70BD1C78-282D-46BF-913A-573354FA3D55

### **401 Unauthorized** {#401-unauthorized-2}

El token no fue enviado o es inválido.

{

 "error": "Unauthorized"

}

Solución: el usuario debe volver a iniciar sesión.

### **500 Internal Server Error** {#500-internal-server-error-2}

Error interno del backend.

{

 "error": "Error interno del servidor"

}

## **Uso esperado en la UI** {#uso-esperado-en-la-ui-2}

Este endpoint puede usarse para mostrar la lista de archivos adjuntos dentro del modal del proyecto.

Ejemplos de uso visual:

nombre del archivo

tipo de documento

fecha de carga

botón para abrir/ver archivo

botón futuro para eliminar archivo

También permite que el módulo de IA identifique qué documentos existen antes de ejecutar la generación automática de backlog.

## **Sugerencia para el frontend** {#sugerencia-para-el-frontend-1}

Cuando el usuario abra el modal de documentos del proyecto, el frontend debería llamar este endpoint para pintar los attachments existentes.

También conviene filtrar por tipo cuando se active el agente de IA, por ejemplo:

GET /api/projects/{projectId}/documents?documentType=SRS

Así el sistema puede priorizar documentos formales de requerimientos antes de enviar información al pipeline de IA.

# **Project Document Delete Endpoint** {#project-document-delete-endpoint}

Este endpoint permite eliminar un documento asociado a un proyecto.

La eliminación es física en dos niveles: primero se elimina el archivo del bucket de Supabase Storage usando su `storagePath`, y después se elimina la metadata registrada en Oracle dentro de la tabla `PROYECTO_DOCUMENTO`.

## **Endpoint** {#endpoint-10}

DELETE /api/projects/documents/{documentId}

## **Path Parameter** {#path-parameter-3}

| Parameter | Type | Description |
| ----- | ----- | ----- |
| documentId | String UUID | Identificador único del documento registrado |

Ejemplo:

/api/projects/documents/91b3c836-a41a-4467-b6f0-32b64c076f00

## **Autenticación** {#autenticación-17}

Este endpoint requiere autenticación mediante JWT Token.

Header requerido:

Authorization: Bearer \<JWT\_TOKEN\>

El token se obtiene previamente mediante:

POST /auth/login

## **Ejemplo de Request** {#ejemplo-de-request-22}

curl \-X DELETE "http://localhost:8080/api/projects/documents/91b3c836-a41a-4467-b6f0-32b64c076f00" \\

\-H "Authorization: Bearer \<JWT\_TOKEN\>"

## **Ejemplo de Response** {#ejemplo-de-response-19}

Si la eliminación es exitosa, el endpoint no regresa body.

200 OK

## **Comportamiento interno** {#comportamiento-interno}

Frontend / Cliente

 ↓

DELETE /api/projects/documents/{documentId}

 ↓

Backend valida JWT

 ↓

Backend busca el documento en PROYECTO\_DOCUMENTO

 ↓

Backend obtiene storagePath

 ↓

Backend elimina el archivo de Supabase Storage

 ↓

Backend elimina la metadata en Oracle

## **Validación posterior** {#validación-posterior}

Después de eliminar, se puede consultar nuevamente:

curl \-X GET "http://localhost:8080/api/projects/70BD1C78-282D-46BF-913A-573354FA3D55/documents" \\

\-H "Authorization: Bearer \<JWT\_TOKEN\>"

Si el proyecto ya no tiene documentos, la respuesta esperada es:

\[\]

## **Posibles respuestas de error** {#posibles-respuestas-de-error-3}

### **400 Bad Request** {#400-bad-request-2}

El `documentId` tiene formato inválido o el documento no existe.

{

 "error": "Invalid UUID format: 91B3C836A41A4467B6F032B64C076F00"

}

Otro ejemplo:

{

 "error": "Project document not found: 91b3c836-a41a-4467-b6f0-32b64c076f00"

}

### **401 Unauthorized** {#401-unauthorized-3}

El token no fue enviado o es inválido.

{

 "error": "Unauthorized"

}

### **500 Internal Server Error** {#500-internal-server-error-3}

Error interno del backend o error al eliminar el archivo en Supabase Storage.

{

 "error": "Error interno del servidor"

}

## **Uso esperado en la UI** {#uso-esperado-en-la-ui-3}

Este endpoint se usa desde el modal de documentos del proyecto, cuando el usuario selecciona eliminar un archivo adjunto.

Uso esperado:

1\. El usuario abre los documentos del proyecto.

2\. La UI muestra la lista de archivos adjuntos.

3\. El usuario presiona eliminar en un documento.

4\. El frontend llama DELETE /api/projects/documents/{documentId}.

5\. El backend elimina el archivo de Supabase y su metadata.

6\. La UI refresca la lista de documentos.

## **Sugerencia para el frontend** {#sugerencia-para-el-frontend-2}

Después de eliminar un documento, refresca:

GET /api/projects/{projectId}/documents

También conviene mostrar una confirmación antes de borrar, porque la eliminación remueve tanto el archivo del bucket como su registro en Oracle.

# **AI Backlog Generation Endpoint** {#ai-backlog-generation-endpoint}

Este endpoint permite iniciar el proceso de generación automática de backlog usando IA.

El backend busca los documentos asociados al proyecto en `PROYECTO_DOCUMENTO`, construye un evento con las URLs públicas de Supabase, incluye el límite máximo de horas definido por el usuario y publica el evento en Kafka en el topic `ai-task-generation-request`.

El microservicio de IA consume ese evento, descarga los documentos, extrae el contenido y genera tareas sugeridas respetando el límite total de horas indicado.

Este endpoint **no crea tareas directamente** en la tabla `TAREA`. Su responsabilidad es iniciar el pipeline de IA de forma asíncrona.

## **Endpoint** {#endpoint-11}

POST /api/projects/{projectId}/ai/generate-backlog

## **Path Parameter** {#path-parameter-4}

| Parameter | Type | Description |
| ----- | ----- | ----- |
| projectId | String UUID | Identificador único del proyecto |

Ejemplo:

/api/projects/70BD1C78-282D-46BF-913A-573354FA3D55/ai/generate-backlog

## **Body** {#body-1}

{

 "maxHours": 4

}

| Campo | Tipo | Requerido | Descripción |
| ----- | ----- | ----- | ----- |
| maxHours | Double | Sí | Número máximo de horas estimadas que puede sumar el backlog generado por IA |

`maxHours` no representa el máximo por tarea individual. Representa el límite total de horas que deben sumar todas las tareas generadas por el modelo.

Ejemplo: si `maxHours` es `4`, la IA puede generar tres tareas de `2.0`, `1.0` y `1.0` horas, porque la suma total es `4.0`.

## **Autenticación** {#autenticación-18}

Este endpoint requiere autenticación mediante JWT Token.

Header requerido:

Authorization: Bearer \<JWT\_TOKEN\>

El token se obtiene previamente mediante el endpoint:

POST /auth/login

## **Ejemplo de Request** {#ejemplo-de-request-23}

curl \-X POST "http://localhost:8080/api/projects/70BD1C78-282D-46BF-913A-573354FA3D55/ai/generate-backlog" \\

\-H "Authorization: Bearer \<JWT\_TOKEN\>" \\

\-H "Content-Type: application/json" \\

\-d '{

 "maxHours": 4

}'

## **Ejemplo de Response** {#ejemplo-de-response-20}

{

 "message": "AI task generation event sent to Kafka",

 "projectId": "70bd1c78-282d-46bf-913a-573354fa3d55",

 "documentsSent": 1,

 "maxHours": 4.0

}

## **Campos de respuesta** {#campos-de-respuesta-8}

| Campo | Tipo | Descripción |
| ----- | ----- | ----- |
| message | String | Mensaje de confirmación indicando que el evento fue enviado a Kafka |
| projectId | UUID | Identificador del proyecto procesado |
| documentsSent | Integer | Número de documentos enviados al pipeline de IA |
| maxHours | Double | Límite máximo de horas enviado al microservicio de IA |

## **Evento publicado en Kafka** {#evento-publicado-en-kafka}

El backend publica un evento en el topic:

ai-task-generation-request

Ejemplo de mensaje:

{

 "projectId": "70bd1c78-282d-46bf-913a-573354fa3d55",

 "projectName": "Oracle Java Bot",

 "projectDescription": "Proyecto de la unidad de formación Desarrollo de Software",

 "maxHours": 4.0,

 "documents": \[

   {

     "type": "SRS",

     "content": null,

     "url": "https://gykofshbdehooqbadjyq.supabase.co/storage/v1/object/public/Test/projects/70bd1c78-282d-46bf-913a-573354fa3d55/1777303334432-srs.pdf"

   }

 \]

}

## **Flujo interno del endpoint** {#flujo-interno-del-endpoint}

Frontend / Cliente

 ↓

POST /api/projects/{projectId}/ai/generate-backlog

 ↓

Backend valida JWT

 ↓

Backend valida maxHours

 ↓

Backend valida existencia del proyecto

 ↓

Backend consulta documentos en PROYECTO\_DOCUMENTO

 ↓

Backend construye AiTaskGenerationRequestEvent

 ↓

Backend publica evento en Kafka

 ↓

AI Service consume evento

 ↓

AI Service descarga documentos desde Supabase

 ↓

AI Service genera tareas sugeridas respetando maxHours

 ↓

AI Service publica respuesta en ai-task-generation-response

 ↓

Backend consume respuesta

 ↓

Backend guarda sugerencias en TAREA\_AI\_SUGERIDA

## **Ejemplo de uso en Frontend JavaScript** {#ejemplo-de-uso-en-frontend-javascript-2}

const token \= localStorage.getItem("token");

const projectId \= "70BD1C78-282D-46BF-913A-573354FA3D55";

const response \= await fetch(

 \`/api/projects/${projectId}/ai/generate-backlog\`,

 {

   method: "POST",

   headers: {

     Authorization: \`Bearer ${token}\`,

     "Content-Type": "application/json"

   },

   body: JSON.stringify({

     maxHours: 4

   })

 }

);

const result \= await response.json();

console.log(result);

## **Posibles respuestas de error** {#posibles-respuestas-de-error-4}

### **400 Bad Request** {#400-bad-request-3}

El `projectId` tiene formato inválido, el proyecto no tiene documentos registrados o `maxHours` no es válido.

Ejemplo:

{

 "error": "Invalid UUID format: 70BD1C78282D46BF913A573354FA3D55"

}

Otro ejemplo:

{

 "error": "Project has no documents uploaded: 70BD1C78-282D-46BF-913A-573354FA3D55"

}

Otro ejemplo:

{

 "error": "maxHours is required"

}

Otro ejemplo:

{

 "error": "maxHours must be greater than 0"

}

Otro ejemplo:

{

 "error": "maxHours must not exceed 200"

}

Solución: enviar el `projectId` en formato UUID con guiones, verificar que el proyecto tenga documentos cargados y mandar un valor válido para `maxHours`.

Para verificar documentos cargados:

GET /api/projects/{projectId}/documents

### **401 Unauthorized** {#401-unauthorized-4}

El token no fue enviado o es inválido.

{

 "error": "Unauthorized"

}

Solución: el usuario debe volver a iniciar sesión.

### **500 Internal Server Error** {#500-internal-server-error-4}

Error interno del backend, error al publicar en Kafka o error inesperado durante la construcción del evento.

{

 "error": "Error interno del servidor"

}

## **Uso esperado en la UI** {#uso-esperado-en-la-ui-4}

Este endpoint debe ejecutarse desde el modal del agente de IA, cuando el usuario selecciona o confirma un proyecto y define el número máximo de horas de trabajo para el backlog generado.

Uso esperado:

1. El usuario abre el modal **“Agent · Generar tareas”**.  
2. Selecciona equipo y proyecto.  
3. Ingresa el número de horas de trabajo disponibles.  
4. El frontend valida que exista un `projectId`.  
5. El frontend valida que `maxHours` sea mayor a `0`.  
6. El frontend llama `POST /api/projects/{projectId}/ai/generate-backlog`.  
7. El backend inicia el pipeline de IA.  
8. La UI muestra un mensaje como **“Generación de backlog iniciada”**.

Como el proceso es asíncrono, la respuesta del endpoint **no contiene las tareas generadas**. Sólo confirma que el evento fue enviado a Kafka.

## **Sugerencia para el frontend** {#sugerencia-para-el-frontend-3}

Antes de llamar este endpoint, el frontend puede consultar:

GET /api/projects/{projectId}/documents

Si la lista está vacía, debería mostrar un mensaje como:

Este proyecto aún no tiene documentos cargados. Sube un SRS, WBS o documento de requerimientos antes de generar tareas con IA.

También debe validar el campo de horas antes de enviar el request:

if (\!maxHours || maxHours \<= 0\) {

 throw new Error("Ingresa un número válido de horas de trabajo.");

}

Después de ejecutar el endpoint, el frontend puede consultar las sugerencias generadas mediante:

GET /api/projects/{projectId}/ai/suggestions?status=PENDING

El sistema debe dejar claro que las sugerencias generadas por IA **no son tareas reales** hasta que el manager las apruebe.

# **AI Task Suggestions List Endpoint** {#ai-task-suggestions-list-endpoint}

Este endpoint permite consultar las tareas sugeridas por IA para un proyecto.

Las sugerencias provienen del pipeline de IA: el microservicio de IA procesa documentos del proyecto, genera propuestas de tareas y el backend las guarda en la tabla `TAREA_AI_SUGERIDA` con estado inicial `PENDING`.

Este endpoint **no consulta la tabla `TAREA`**, porque las sugerencias todavía no son tareas oficiales del proyecto.

## **Endpoint** {#endpoint-12}

GET /api/projects/{projectId}/ai/suggestions

## **Path Parameter** {#path-parameter-5}

| Parameter | Type | Description |
| ----- | ----- | ----- |
| projectId | String UUID | Identificador único del proyecto |

Ejemplo:

/api/projects/70BD1C78-282D-46BF-913A-573354FA3D55/ai/suggestions

## **Query Parameter Opcional** {#query-parameter-opcional-1}

| Parameter | Type | Required | Description |
| ----- | ----- | ----- | ----- |
| status | String | No | Filtra sugerencias por estado |

Valor soportado actualmente:

PENDING

Ejemplo con filtro:

/api/projects/70BD1C78-282D-46BF-913A-573354FA3D55/ai/suggestions?status=PENDING

## **Autenticación** {#autenticación-19}

Este endpoint requiere autenticación mediante JWT Token.

Header requerido:

Authorization: Bearer \<JWT\_TOKEN\>

El token se obtiene previamente mediante el endpoint:

POST /auth/login

## **Ejemplo de Request** {#ejemplo-de-request-24}

curl \-X GET "http://localhost:8080/api/projects/70BD1C78-282D-46BF-913A-573354FA3D55/ai/suggestions" \\

\-H "Authorization: Bearer \<JWT\_TOKEN\>"

## **Ejemplo de Request con filtro** {#ejemplo-de-request-con-filtro-1}

curl \-X GET "http://localhost:8080/api/projects/70BD1C78-282D-46BF-913A-573354FA3D55/ai/suggestions?status=PENDING" \\

\-H "Authorization: Bearer \<JWT\_TOKEN\>"

## **Ejemplo de Response** {#ejemplo-de-response-21}

\[

 {

   "aiTaskId": "26f8ca2c-cdbb-463e-8c3e-14ca3adfda67",

   "projectId": "70bd1c78-282d-46bf-913a-573354fa3d55",

   "titulo": "Crear Tarea",

   "descripcion": "Implementar la funcionalidad que permite a un usuario autenticado crear una nueva tarea asociada a un proyecto mediante un comando enviado desde el ChatBot de Telegram. Incluir validaciones de formato y campos obligatorios.",

   "tiempoEstimado": 4.0,

   "status": "PENDING",

   "createdAt": "2026-04-27T17:53:01.451471"

 },

 {

   "aiTaskId": "9e56f23b-1a6f-4405-9d90-2e62ae56f81b",

   "projectId": "70bd1c78-282d-46bf-913a-573354fa3d55",

   "titulo": "Editar Tarea",

   "descripcion": "Desarrollar la funcionalidad que permite a un usuario con rol Manager modificar los datos de una tarea existente mediante un comando en el ChatBot de Telegram. Incluir validaciones de existencia y permisos.",

   "tiempoEstimado": 3.5,

   "status": "PENDING",

   "createdAt": "2026-04-27T17:53:01.451536"

 }

\]

Si el proyecto existe pero todavía no tiene sugerencias generadas, la respuesta esperada es:

\[\]

## **Campos de respuesta** {#campos-de-respuesta-9}

| Campo | Tipo | Descripción |
| ----- | ----- | ----- |
| aiTaskId | UUID | Identificador único de la sugerencia generada por IA |
| projectId | UUID | Identificador del proyecto asociado |
| titulo | String | Título sugerido para la tarea |
| descripcion | String | Descripción generada por IA |
| tiempoEstimado | Double | Tiempo estimado sugerido en horas |
| status | String | Estado de revisión de la sugerencia |
| createdAt | DateTime | Fecha y hora en que la sugerencia fue registrada |

## **Estados de sugerencia** {#estados-de-sugerencia}

Actualmente el estado implementado es:

| Estado | Descripción |
| ----- | ----- |
| PENDING | La sugerencia fue generada por IA y está pendiente de revisión por el manager |

Estados futuros esperados:

| Estado | Descripción |
| ----- | ----- |
| APPROVED | La sugerencia fue aprobada y convertida en una tarea real |
| REJECTED | La sugerencia fue rechazada y no será convertida en tarea |

## **Ejemplo de uso en Frontend JavaScript** {#ejemplo-de-uso-en-frontend-javascript-3}

const token \= localStorage.getItem("token");

const projectId \= "70BD1C78-282D-46BF-913A-573354FA3D55";

const response \= await fetch(

 \`/api/projects/${projectId}/ai/suggestions\`,

 {

   headers: {

     Authorization: \`Bearer ${token}\`

   }

 }

);

const suggestions \= await response.json();

console.log(suggestions);

## **Ejemplo de uso con filtro en Frontend JavaScript** {#ejemplo-de-uso-con-filtro-en-frontend-javascript-1}

const token \= localStorage.getItem("token");

const projectId \= "70BD1C78-282D-46BF-913A-573354FA3D55";

const response \= await fetch(

 \`/api/projects/${projectId}/ai/suggestions?status=PENDING\`,

 {

   headers: {

     Authorization: \`Bearer ${token}\`

   }

 }

);

const pendingSuggestions \= await response.json();

console.log(pendingSuggestions);

## **Posibles respuestas de error** {#posibles-respuestas-de-error-5}

### **400 Bad Request** {#400-bad-request-4}

El `projectId` tiene formato inválido o el filtro `status` no es soportado.

Ejemplo:

{

 "error": "Invalid UUID format: 70BD1C78282D46BF913A573354FA3D55"

}

Otro ejemplo:

{

 "error": "Invalid status filter: APPROVED. Allowed value: PENDING"

}

Solución: enviar el `projectId` en formato UUID con guiones y usar un filtro soportado.

Ejemplo correcto:

70BD1C78-282D-46BF-913A-573354FA3D55

### **401 Unauthorized** {#401-unauthorized-5}

El token no fue enviado o es inválido.

{

 "error": "Unauthorized"

}

Solución: el usuario debe volver a iniciar sesión.

### **500 Internal Server Error** {#500-internal-server-error-5}

Error interno del backend.

{

 "error": "Error interno del servidor"

}

## **Uso esperado en la UI** {#uso-esperado-en-la-ui-5}

Este endpoint debe utilizarse después de ejecutar:

POST /api/projects/{projectId}/ai/generate-backlog

Uso esperado:

1\. El usuario ejecuta la generación de backlog desde el modal del agente.

2\. El backend inicia el pipeline de IA.

3\. El microservicio de IA genera sugerencias.

4\. El backend guarda las sugerencias como PENDING.

5\. El frontend consulta este endpoint.

6\. El modal muestra las sugerencias para revisión del manager.

## **Sugerencia para el frontend** {#sugerencia-para-el-frontend-4}

Para el MVP, el frontend puede consultar directamente:

GET /api/projects/{projectId}/ai/suggestions?status=PENDING

Después, cada sugerencia debería mostrarse con:

título

descripción

tiempo estimado

estado

acciones futuras: aprobar / rechazar

La UI debe dejar claro que estas sugerencias **aún no son tareas reales** hasta que el manager las apruebe.

# **AI Task Suggestion Reject Endpoint** {#ai-task-suggestion-reject-endpoint}

Este endpoint permite rechazar una sugerencia de tarea generada por IA.

El rechazo es lógico: la sugerencia no se elimina de la base de datos, sólo cambia su estado de `PENDING` a `REJECTED`. Esto permite conservar trazabilidad sobre las decisiones tomadas por el manager respecto a las propuestas generadas por IA.

## **Endpoint** {#endpoint-13}

PATCH /api/projects/ai/suggestions/{aiTaskId}/reject

## **Path Parameter** {#path-parameter-6}

| Parameter | Type | Description |
| ----- | ----- | ----- |
| aiTaskId | String UUID | Identificador único de la sugerencia generada por IA |

Ejemplo:

/api/projects/ai/suggestions/26f8ca2c-cdbb-463e-8c3e-14ca3adfda67/reject

## **Autenticación** {#autenticación-20}

Este endpoint requiere autenticación mediante JWT Token.

Header requerido:

Authorization: Bearer \<JWT\_TOKEN\>

El token se obtiene previamente mediante el endpoint:

POST /auth/login

## **Ejemplo de Request** {#ejemplo-de-request-25}

curl \-X PATCH "http://localhost:8080/api/projects/ai/suggestions/26f8ca2c-cdbb-463e-8c3e-14ca3adfda67/reject" \\

\-H "Authorization: Bearer \<JWT\_TOKEN\>"

## **Ejemplo de Response** {#ejemplo-de-response-22}

{

 "aiTaskId": "26f8ca2c-cdbb-463e-8c3e-14ca3adfda67",

 "projectId": "70bd1c78-282d-46bf-913a-573354fa3d55",

 "titulo": "Crear Tarea",

 "descripcion": "Implementar la funcionalidad que permite a un usuario autenticado crear una nueva tarea asociada a un proyecto mediante un comando enviado desde el ChatBot de Telegram. Incluir validaciones de formato y campos obligatorios.",

 "tiempoEstimado": 4.0,

 "status": "REJECTED",

 "createdAt": "2026-04-27T17:53:01.451471"

}

## **Campos de respuesta** {#campos-de-respuesta-10}

| Campo | Tipo | Descripción |
| ----- | ----- | ----- |
| aiTaskId | UUID | Identificador único de la sugerencia |
| projectId | UUID | Identificador del proyecto asociado |
| titulo | String | Título sugerido por la IA |
| descripcion | String | Descripción generada por IA |
| tiempoEstimado | Double | Tiempo estimado sugerido en horas |
| status | String | Estado actualizado de la sugerencia |
| createdAt | DateTime | Fecha y hora en que la sugerencia fue registrada |

## **Comportamiento esperado** {#comportamiento-esperado}

Si la sugerencia está en estado `PENDING`, el backend cambia su estado a:

REJECTED

Si la sugerencia ya estaba en estado `REJECTED`, el backend devuelve la sugerencia sin modificarla.

Si la sugerencia ya estaba en estado `APPROVED`, el backend no permite rechazarla.

## **Ejemplo de uso en Frontend JavaScript** {#ejemplo-de-uso-en-frontend-javascript-4}

const token \= localStorage.getItem("token");

const aiTaskId \= "26f8ca2c-cdbb-463e-8c3e-14ca3adfda67";

const response \= await fetch(

 \`/api/projects/ai/suggestions/${aiTaskId}/reject\`,

 {

   method: "PATCH",

   headers: {

     Authorization: \`Bearer ${token}\`

   }

 }

);

const rejectedSuggestion \= await response.json();

console.log(rejectedSuggestion);

## **Posibles respuestas de error** {#posibles-respuestas-de-error-6}

### **400 Bad Request** {#400-bad-request-5}

El `aiTaskId` tiene formato inválido o la sugerencia no puede ser rechazada.

Ejemplo:

{

 "error": "Invalid UUID format: 26F8CA2CCDBB463E8C3E14CA3ADFDA67"

}

Otro ejemplo:

{

 "error": "Cannot reject an approved AI suggestion"

}

Solución: enviar el `aiTaskId` en formato UUID con guiones y verificar que la sugerencia no haya sido aprobada previamente.

### **401 Unauthorized** {#401-unauthorized-6}

El token no fue enviado o es inválido.

{

 "error": "Unauthorized"

}

Solución: el usuario debe volver a iniciar sesión.

### **500 Internal Server Error** {#500-internal-server-error-6}

Error interno del backend.

{

 "error": "Error interno del servidor"

}

## **Uso esperado en la UI** {#uso-esperado-en-la-ui-6}

Este endpoint debe utilizarse desde el modal de revisión de sugerencias IA.

Uso esperado:

1\. El manager visualiza las sugerencias pendientes.

2\. El manager decide que una sugerencia no debe convertirse en tarea real.

3\. El frontend llama PATCH /api/projects/ai/suggestions/{aiTaskId}/reject.

4\. El backend cambia el estado de la sugerencia a REJECTED.

5\. La UI actualiza la lista de sugerencias pendientes.

## **Sugerencia para el frontend** {#sugerencia-para-el-frontend-5}

Después de rechazar una sugerencia, el frontend puede volver a consultar:

GET /api/projects/{projectId}/ai/suggestions?status=PENDING

Así la sugerencia rechazada deja de aparecer en la lista principal de pendientes, pero sigue disponible en el historial general mediante:

GET /api/projects/{projectId}/ai/suggestions

Siguiente paso del plan: **aprobar una sugerencia y convertirla en una tarea real**, que requiere `fechaLimite`, `prioridadId` y opcionalmente `sprintId`.

# **AI Task Suggestion Approve Endpoint** {#ai-task-suggestion-approve-endpoint}

Este endpoint permite aprobar una sugerencia de tarea generada por IA y convertirla en una tarea real del proyecto.

La IA únicamente propone información inicial como título, descripción y tiempo estimado. El manager debe completar los campos obligatorios de negocio, como fecha límite y prioridad, antes de convertir la sugerencia en una tarea oficial.

## **Endpoint** {#endpoint-14}

POST /api/projects/ai/suggestions/{aiTaskId}/approve

## **Path Parameter** {#path-parameter-7}

| Parameter | Type | Description |
| ----- | ----- | ----- |
| aiTaskId | String UUID | Identificador único de la sugerencia generada por IA |

Ejemplo:

/api/projects/ai/suggestions/9e56f23b-1a6f-4405-9d90-2e62ae56f81b/approve

## **Body** {#body-2}

{

 "fechaLimite": "2026-05-10T23:59:00",

 "prioridadId": 2,

 "sprintId": null

}

| Campo | Tipo | Requerido | Descripción |
| ----- | ----- | ----- | ----- |
| fechaLimite | String DateTime | Sí | Fecha límite de la tarea real |
| prioridadId | Integer | Sí | Identificador de prioridad de la tarea |
| sprintId | String UUID / null | No | Sprint al que se asignará la tarea |

## **Autenticación** {#autenticación-21}

Este endpoint requiere autenticación mediante JWT Token.

Header requerido:

Authorization: Bearer \<JWT\_TOKEN\>

El token se obtiene previamente mediante:

POST /auth/login

## **Ejemplo de Request** {#ejemplo-de-request-26}

curl \-X POST "http://localhost:8080/api/projects/ai/suggestions/9e56f23b-1a6f-4405-9d90-2e62ae56f81b/approve" \\

\-H "Authorization: Bearer \<JWT\_TOKEN\>" \\

\-H "Content-Type: application/json" \\

\-d '{

 "fechaLimite": "2026-05-10T23:59:00",

 "prioridadId": 2,

 "sprintId": null

}'

## **Ejemplo de Response** {#ejemplo-de-response-23}

{

 "suggestion": {

   "aiTaskId": "9e56f23b-1a6f-4405-9d90-2e62ae56f81b",

   "projectId": "70bd1c78-282d-46bf-913a-573354fa3d55",

   "titulo": "Editar Tarea",

   "descripcion": "Desarrollar la funcionalidad que permite a un usuario con rol Manager modificar los datos de una tarea existente mediante un comando en el ChatBot de Telegram. Incluir validaciones de existencia y permisos.",

   "tiempoEstimado": 3.5,

   "status": "APPROVED",

   "createdAt": "2026-04-27T17:53:01.451536"

 },

 "createdTask": {

   "taskId": "BCB30EA9161D4704A8E0C747429EC94A",

   "titulo": "Editar Tarea",

   "descripcion": "Desarrollar la funcionalidad que permite a un usuario con rol Manager modificar los datos de una tarea existente mediante un comando en el ChatBot de Telegram. Incluir validaciones de existencia y permisos.",

   "fechaCreacion": "2026-04-27T18:15:10.309286461",

   "fechaLimite": "2026-05-10T23:59",

   "fechaFinalizacion": null,

   "estadoId": 1,

   "prioridadId": 2,

   "projectId": "70BD1C78282D46BF913A573354FA3D55",

   "sprintId": null,

   "sprintNombre": null,

   "tiempoEstimado": 3.5,

   "tiempoReal": 0.0

 }

}

## **Campos de respuesta** {#campos-de-respuesta-11}

| Campo | Tipo | Descripción |
| ----- | ----- | ----- |
| suggestion | Object | Sugerencia IA actualizada |
| suggestion.aiTaskId | UUID | Identificador de la sugerencia |
| suggestion.projectId | UUID | Proyecto asociado |
| suggestion.titulo | String | Título propuesto por IA |
| suggestion.descripcion | String | Descripción propuesta por IA |
| suggestion.tiempoEstimado | Double | Tiempo estimado sugerido |
| suggestion.status | String | Estado actualizado de la sugerencia |
| suggestion.createdAt | DateTime | Fecha de creación de la sugerencia |
| createdTask | Object | Tarea real creada en la tabla `TAREA` |
| createdTask.taskId | String HEX UUID | Identificador de la tarea real |
| createdTask.titulo | String | Título de la tarea creada |
| createdTask.descripcion | String | Descripción de la tarea creada |
| createdTask.fechaCreacion | DateTime | Fecha de creación de la tarea |
| createdTask.fechaLimite | DateTime | Fecha límite definida por el manager |
| createdTask.estadoId | Integer | Estado inicial de la tarea |
| createdTask.prioridadId | Integer | Prioridad asignada por el manager |
| createdTask.projectId | String HEX UUID | Proyecto asociado a la tarea |
| createdTask.sprintId | String HEX UUID / null | Sprint asignado, si aplica |
| createdTask.tiempoEstimado | Double | Tiempo estimado de la tarea |
| createdTask.tiempoReal | Double | Tiempo real inicial de la tarea |

## **Comportamiento esperado** {#comportamiento-esperado-1}

Si la sugerencia está en estado `PENDING`, el backend crea una tarea real y cambia la sugerencia a:

APPROVED

Si la sugerencia ya está `APPROVED`, el backend no la vuelve a aprobar.

Si la sugerencia está `REJECTED`, el backend no permite convertirla en tarea real.

## **Ejemplo de uso en Frontend JavaScript** {#ejemplo-de-uso-en-frontend-javascript-5}

const token \= localStorage.getItem("token");

const aiTaskId \= "9e56f23b-1a6f-4405-9d90-2e62ae56f81b";

const response \= await fetch(

 \`/api/projects/ai/suggestions/${aiTaskId}/approve\`,

 {

   method: "POST",

   headers: {

     Authorization: \`Bearer ${token}\`,

     "Content-Type": "application/json"

   },

   body: JSON.stringify({

     fechaLimite: "2026-05-10T23:59:00",

     prioridadId: 2,

     sprintId: null

   })

 }

);

const result \= await response.json();

console.log(result.suggestion);

console.log(result.createdTask);

## **Posibles respuestas de error** {#posibles-respuestas-de-error-7}

### **400 Bad Request** {#400-bad-request-6}

El `aiTaskId` tiene formato inválido, faltan campos obligatorios o la sugerencia no puede aprobarse.

{

 "error": "fechaLimite is required"

}

{

 "error": "prioridadId is required"

}

{

 "error": "Cannot approve a rejected AI suggestion"

}

{

 "error": "AI suggestion is already approved"

}

### **401 Unauthorized** {#401-unauthorized-7}

El token no fue enviado o es inválido.

{

 "error": "Unauthorized"

}

### **500 Internal Server Error** {#500-internal-server-error-7}

Error interno del backend.

{

 "error": "Error interno del servidor"

}

## **Uso esperado en la UI** {#uso-esperado-en-la-ui-7}

Este endpoint se utiliza cuando el manager decide aceptar una sugerencia generada por IA.

Uso esperado:

1\. El frontend muestra sugerencias PENDING.

2\. El manager selecciona una sugerencia.

3\. El manager define fecha límite, prioridad y opcionalmente sprint.

4\. El frontend llama POST /api/projects/ai/suggestions/{aiTaskId}/approve.

5\. El backend crea la tarea real.

6\. La sugerencia cambia a APPROVED.

7\. La UI actualiza la lista de sugerencias y el backlog del proyecto.

## **Sugerencia para el frontend** {#sugerencia-para-el-frontend-6}

Después de aprobar una sugerencia, el frontend puede:

\- remover la sugerencia de la lista de pendientes;

\- agregar la tarea creada al backlog visual;

\- o refrescar ambos endpoints:

 GET /api/projects/{projectId}/ai/suggestions?status=PENDING

 GET /api/projects/{projectId}/tasks

Con esto ya tienes documentado el endpoint que cierra el ciclo funcional del pipeline IA para el MVP.

# **AI Duplicate Detection Start Endpoint** {#ai-duplicate-detection-start-endpoint}

Este endpoint permite iniciar una detección de tareas posiblemente duplicadas dentro de un proyecto.

El backend obtiene las tareas actuales del proyecto, crea una ejecución de análisis en estado `PENDING` y publica un evento en Kafka para que el microservicio de IA procese las tareas semánticamente.

La IA no modifica tareas, no elimina tareas y no crea nuevas tareas. Únicamente analiza títulos y descripciones para detectar posible trabajo redundante.

## **Endpoint** {#endpoint-15}

POST /api/projects/{projectId}/ai/duplicate-detection

## **Path Parameter** {#path-parameter-8}

| Parameter | Type | Description |
| ----- | ----- | ----- |
| `projectId` | String HEX UUID | Identificador único del proyecto |

Ejemplo:

/api/projects/70BD1C78282D46BF913A573354FA3D55/ai/duplicate-detection

## **Body** {#body-3}

{

 "threshold": 0.80

}

| Campo | Tipo | Requerido | Descripción |
| ----- | ----- | ----- | ----- |
| `threshold` | Double | No | Nivel mínimo de similitud requerido para reportar posibles duplicados. Debe estar entre `0` y `1`. Si no se envía, el backend usa `0.80`. |

## **Autenticación** {#autenticación-22}

Este endpoint requiere autenticación mediante JWT Token.

Header requerido:

Authorization: Bearer \<JWT\_TOKEN\>

El token se obtiene previamente mediante:

POST /auth/login

## **Ejemplo de Request** {#ejemplo-de-request-27}

curl \-X POST "http://localhost:8080/api/projects/70BD1C78282D46BF913A573354FA3D55/ai/duplicate-detection" \\

\-H "Authorization: Bearer \<JWT\_TOKEN\>" \\

\-H "Content-Type: application/json" \\

\-d '{

 "threshold": 0.80

}'

## **Ejemplo de Response** {#ejemplo-de-response-24}

{

 "completedAt": null,

 "createdAt": "2026-04-28T02:21:50.941609594",

 "errorMessage": null,

 "projectId": "70BD1C78282D46BF913A573354FA3D55",

 "runId": "E497C0244B594322ADE48FD71AA0D5E4",

 "status": "PENDING",

 "tasksAnalyzed": 77,

 "threshold": 0.8

}

## **Campos de respuesta** {#campos-de-respuesta-12}

| Campo | Tipo | Descripción |
| ----- | ----- | ----- |
| `runId` | String HEX UUID | Identificador único de la ejecución de detección |
| `projectId` | String HEX UUID | Proyecto analizado |
| `status` | String | Estado actual de la ejecución |
| `threshold` | Double | Umbral de similitud usado para la detección |
| `tasksAnalyzed` | Integer | Número de tareas enviadas al microservicio de IA |
| `createdAt` | DateTime | Fecha y hora en que se creó la ejecución |
| `completedAt` | DateTime / null | Fecha y hora en que terminó la ejecución. Inicialmente es `null` |
| `errorMessage` | String / null | Mensaje de error si la ejecución falla |

## **Estados posibles** {#estados-posibles}

| Estado | Descripción |
| ----- | ----- |
| `PENDING` | La ejecución fue creada y el evento fue enviado a Kafka, pero la IA aún no responde |
| `COMPLETED` | La IA procesó las tareas y el backend guardó los resultados |
| `FAILED` | La IA o el backend detectaron un error durante el procesamiento |

## **Comportamiento esperado** {#comportamiento-esperado-2}

Cuando se llama este endpoint, el backend:

1. Valida que el proyecto exista.  
2. Valida que el `threshold` esté entre `0` y `1`.  
3. Obtiene las tareas actuales del proyecto.  
4. Verifica que existan al menos 2 tareas.  
5. Crea un registro en `AI_TASK_DUPLICATE_DETECTION_RUN` con estado `PENDING`.  
6. Publica un evento en Kafka en el topic:

ai-duplicate-detection-request

7. Regresa al frontend el `runId` para consultar resultados posteriormente.

## **Flujo asíncrono** {#flujo-asíncrono}

Este endpoint **no devuelve los duplicados inmediatamente**.

El flujo completo ocurre de forma asíncrona:

Frontend

→ Backend

→ Kafka topic: ai-duplicate-detection-request

→ AI Service Python

→ OpenAI

→ Kafka topic: ai-duplicate-detection-response

→ Backend consumer

→ Base de datos

Después de llamar este endpoint, el frontend debe consultar el resultado usando:

GET /api/projects/{projectId}/ai/duplicate-detection/latest

o:

GET /api/projects/{projectId}/ai/duplicate-detection/runs/{runId}/results

## **Ejemplo de uso en Frontend JavaScript** {#ejemplo-de-uso-en-frontend-javascript-6}

const token \= localStorage.getItem("token");

const projectId \= "70BD1C78282D46BF913A573354FA3D55";

const response \= await fetch(

 \`/api/projects/${projectId}/ai/duplicate-detection\`,

 {

   method: "POST",

   headers: {

     Authorization: \`Bearer ${token}\`,

     "Content-Type": "application/json"

   },

   body: JSON.stringify({

     threshold: 0.80

   })

 }

);

const result \= await response.json();

console.log(result.runId);

console.log(result.status);

console.log(result.tasksAnalyzed);

## **Posibles respuestas de error** {#posibles-respuestas-de-error-8}

### **400 Bad Request** {#400-bad-request-7}

El `projectId` tiene formato inválido.

{

 "error": "ProjectId inválido"

}

El `threshold` está fuera del rango permitido.

{

 "error": "threshold must be between 0 and 1"

}

El proyecto tiene menos de 2 tareas.

{

 "error": "At least 2 tasks are required to detect duplicates"

}

### **401 Unauthorized** {#401-unauthorized-8}

El token no fue enviado o es inválido.

{

 "error": "Unauthorized"

}

### **404 / 400 Project not found** {#404-/-400-project-not-found}

El proyecto no existe.

{

 "error": "Project not found"

}

### **500 Internal Server Error** {#500-internal-server-error-8}

Error interno del backend o fallo al publicar el evento en Kafka.

{

 "error": "Error interno del servidor"

}

## **Uso esperado en la UI** {#uso-esperado-en-la-ui-8}

Este endpoint se utiliza cuando el manager o admin desea analizar si existen tareas posiblemente duplicadas dentro de un proyecto.

Uso esperado:

1. El frontend muestra una acción como **“Detectar tareas duplicadas”**.  
2. El manager selecciona un umbral de similitud o usa el valor default `0.80`.  
3. El frontend llama:

POST /api/projects/{projectId}/ai/duplicate-detection

4. El backend crea una ejecución en estado `PENDING`.  
5. La UI muestra un estado de procesamiento.  
6. El frontend consulta el resultado más reciente.  
7. Cuando el estado cambia a `COMPLETED`, la UI muestra los pares de tareas posiblemente duplicadas.

## **Sugerencia para el frontend** {#sugerencia-para-el-frontend-7}

Después de iniciar la detección, el frontend puede hacer polling cada pocos segundos usando:

GET /api/projects/{projectId}/ai/duplicate-detection/latest

Mientras el `status` sea:

PENDING

la UI puede mostrar:

Analizando tareas duplicadas...

Cuando el `status` sea:

COMPLETED

la UI puede mostrar los resultados.

Si el `status` es:

FAILED

la UI debe mostrar el campo `errorMessage`.

## **Nota de calidad semántica** {#nota-de-calidad-semántica}

El campo `threshold` controla qué tan estricta será la detección.

Para MVP se puede usar:

{

 "threshold": 0.80

}

Para reducir falsos positivos en un entorno más cercano a producción, se recomienda probar con:

{

 "threshold": 0.88

}

Esto ayuda a que la IA reporte únicamente tareas con similitud más alta.

# **AI Duplicate Detection Latest Endpoint** {#ai-duplicate-detection-latest-endpoint}

Este endpoint permite consultar la ejecución más reciente de detección de tareas duplicadas para un proyecto, junto con los resultados encontrados por la IA.

Se utiliza después de iniciar el análisis con:

POST /api/projects/{projectId}/ai/duplicate-detection

Como el pipeline funciona de forma asíncrona con Kafka, este endpoint permite que el frontend consulte si el análisis ya terminó y, en caso afirmativo, muestre los posibles duplicados al manager.

## **Endpoint** {#endpoint-16}

GET /api/projects/{projectId}/ai/duplicate-detection/latest

## **Path Parameter** {#path-parameter-9}

| Parameter | Type | Description |
| ----- | ----- | ----- |
| `projectId` | String HEX UUID | Identificador único del proyecto |

Ejemplo:

/api/projects/70BD1C78282D46BF913A573354FA3D55/ai/duplicate-detection/latest

## **Body** {#body-4}

Este endpoint no requiere body.

## **Autenticación** {#autenticación-23}

Este endpoint requiere autenticación mediante JWT Token.

Header requerido:

Authorization: Bearer \<JWT\_TOKEN\>

El token se obtiene previamente mediante:

POST /auth/login

## **Ejemplo de Request** {#ejemplo-de-request-28}

curl \-X GET "http://localhost:8080/api/projects/70BD1C78282D46BF913A573354FA3D55/ai/duplicate-detection/latest" \\

\-H "Authorization: Bearer \<JWT\_TOKEN\>"

## **Ejemplo de Response** {#ejemplo-de-response-25}

{

 "run": {

   "completedAt": "2026-04-28T02:21:59.449032",

   "createdAt": "2026-04-28T02:21:50.941610",

   "errorMessage": null,

   "projectId": "70BD1C78282D46BF913A573354FA3D55",

   "runId": "E497C0244B594322ADE48FD71AA0D5E4",

   "status": "COMPLETED",

   "tasksAnalyzed": 77,

   "threshold": 0.8

 },

 "results": \[

   {

     "createdAt": "2026-04-28T02:21:59.447578",

     "projectId": "70BD1C78282D46BF913A573354FA3D55",

     "reason": "Ambas tareas se centran en la creación de la tabla TAREA y su estructura.",

     "resultId": "5D749B3CA6754BBAA55F2C301B95F61E",

     "runId": "E497C0244B594322ADE48FD71AA0D5E4",

     "similarityScore": 0.85,

     "taskAId": "4FA9D93F9F61AEBAE063F862000A9F1C",

     "taskATitle": "Crear tabla TAREA con constraints",

     "taskBId": "4FA9E940A9E3BA06E063F862000AF904",

     "taskBTitle": "Implementar entidad TaskEntity"

   },

   {

     "createdAt": "2026-04-28T02:21:59.447660",

     "projectId": "70BD1C78282D46BF913A573354FA3D55",

     "reason": "Ambas tareas implican la creación de tablas relacionadas con la gestión de tareas.",

     "resultId": "EEB81A3DC62147439024510FEED9EF17",

     "runId": "E497C0244B594322ADE48FD71AA0D5E4",

     "similarityScore": 0.82,

     "taskAId": "4FA9D93F9F63AEBAE063F862000A9F1C",

     "taskATitle": "Crear tabla relación usuario-tarea",

     "taskBId": "4FA9B2D1269B8055E063F862000A04F0",

     "taskBTitle": "Crear tablas de catálogo"

   },

   {

     "createdAt": "2026-04-28T02:21:59.447673",

     "projectId": "70BD1C78282D46BF913A573354FA3D55",

     "reason": "Ambas tareas están relacionadas con la autenticación y la gestión de usuarios.",

     "resultId": "91A6C47213814D6595525B191A6AE1EA",

     "runId": "E497C0244B594322ADE48FD71AA0D5E4",

     "similarityScore": 0.81,

     "taskAId": "4FA9BEB0611A8057E063F862000A40ED",

     "taskATitle": "Crear DTOs de autenticación",

     "taskBId": "4FA9BEB0611B8057E063F862000A40ED",

     "taskBTitle": "Implementar servicio de autenticación"

   }

 \]

}

## **Campos de respuesta** {#campos-de-respuesta-13}

### **Objeto `run`** {#objeto-run}

| Campo | Tipo | Descripción |
| ----- | ----- | ----- |
| `run.runId` | String HEX UUID | Identificador único de la ejecución de detección |
| `run.projectId` | String HEX UUID | Proyecto analizado |
| `run.status` | String | Estado actual de la ejecución |
| `run.threshold` | Double | Umbral de similitud utilizado |
| `run.tasksAnalyzed` | Integer | Número de tareas analizadas |
| `run.createdAt` | DateTime | Fecha y hora en que se inició la ejecución |
| `run.completedAt` | DateTime / null | Fecha y hora en que terminó la ejecución |
| `run.errorMessage` | String / null | Mensaje de error si la ejecución falló |

### **Arreglo `results`** {#arreglo-results}

| Campo | Tipo | Descripción |
| ----- | ----- | ----- |
| `results[].resultId` | String HEX UUID | Identificador único del resultado |
| `results[].runId` | String HEX UUID | Ejecución a la que pertenece el resultado |
| `results[].projectId` | String HEX UUID | Proyecto asociado |
| `results[].taskAId` | String HEX UUID | Identificador de la primera tarea comparada |
| `results[].taskATitle` | String | Título snapshot de la primera tarea |
| `results[].taskBId` | String HEX UUID | Identificador de la segunda tarea comparada |
| `results[].taskBTitle` | String | Título snapshot de la segunda tarea |
| `results[].similarityScore` | Double | Nivel de similitud calculado por la IA |
| `results[].reason` | String | Explicación breve de por qué podrían estar duplicadas |
| `results[].createdAt` | DateTime | Fecha de creación del resultado |

## **Comportamiento esperado** {#comportamiento-esperado-3}

Este endpoint obtiene la ejecución más reciente del proyecto y sus resultados asociados.

Si la ejecución más reciente está en estado `PENDING`, el response puede devolver:

{

 "run": {

   "runId": "E497C0244B594322ADE48FD71AA0D5E4",

   "projectId": "70BD1C78282D46BF913A573354FA3D55",

   "status": "PENDING",

   "threshold": 0.8,

   "tasksAnalyzed": 77,

   "createdAt": "2026-04-28T02:21:50.941610",

   "completedAt": null,

   "errorMessage": null

 },

 "results": \[\]

}

Si la ejecución está en estado `COMPLETED`, el arreglo `results` contiene los posibles duplicados encontrados.

Si la ejecución está en estado `FAILED`, `results` normalmente estará vacío y `errorMessage` indicará la causa del fallo.

## **Estados posibles** {#estados-posibles-1}

| Estado | Descripción |
| ----- | ----- |
| `PENDING` | El análisis fue solicitado, pero la IA aún no ha respondido |
| `COMPLETED` | La IA respondió y el backend guardó los resultados |
| `FAILED` | Ocurrió un error durante el procesamiento |

## **Ejemplo de uso en Frontend JavaScript** {#ejemplo-de-uso-en-frontend-javascript-7}

const token \= localStorage.getItem("token");

const projectId \= "70BD1C78282D46BF913A573354FA3D55";

const response \= await fetch(

 \`/api/projects/${projectId}/ai/duplicate-detection/latest\`,

 {

   method: "GET",

   headers: {

     Authorization: \`Bearer ${token}\`

   }

 }

);

const result \= await response.json();

if (result.run.status \=== "PENDING") {

 console.log("La detección sigue en proceso...");

}

if (result.run.status \=== "COMPLETED") {

 console.log("Duplicados encontrados:", result.results);

}

if (result.run.status \=== "FAILED") {

 console.error("Error en detección:", result.run.errorMessage);

}

## **Posibles respuestas de error** {#posibles-respuestas-de-error-9}

### **400 Bad Request** {#400-bad-request-8}

El `projectId` tiene formato inválido.

{

 "error": "ProjectId inválido"

}

No existen ejecuciones de detección para el proyecto.

{

 "error": "No duplicate detection runs found for project"

}

### **401 Unauthorized** {#401-unauthorized-9}

El token no fue enviado o es inválido.

{

 "error": "Unauthorized"

}

### **500 Internal Server Error** {#500-internal-server-error-9}

Error interno del backend.

{

 "error": "Error interno del servidor"

}

## **Uso esperado en la UI** {#uso-esperado-en-la-ui-9}

Este endpoint se utiliza para mostrar el resultado más reciente del análisis de duplicados.

Uso esperado:

1. El manager inicia la detección con:

POST /api/projects/{projectId}/ai/duplicate-detection

2. La UI muestra un mensaje de carga, por ejemplo:

Analizando tareas duplicadas...

3. La UI consulta periódicamente:

GET /api/projects/{projectId}/ai/duplicate-detection/latest

4. Cuando `status` cambia a `COMPLETED`, la UI muestra la lista de posibles duplicados.  
5. Si `status` cambia a `FAILED`, la UI muestra el mensaje de error.

## **Sugerencia para el frontend** {#sugerencia-para-el-frontend-8}

Este endpoint es el más conveniente para una primera versión del frontend porque no requiere que el usuario seleccione manualmente un `runId`.

La UI puede mostrar cada resultado como una tarjeta comparativa:

Posible duplicado detectado

Tarea A:

Crear tabla TAREA con constraints

Tarea B:

Implementar entidad TaskEntity

Similitud:

85%

Motivo:

Ambas tareas se centran en la creación de la tabla TAREA y su estructura.

Para MVP, se recomienda mostrar estos resultados como **posibles duplicados**, no como duplicados confirmados.

# **AI Duplicate Detection Runs Endpoint** {#ai-duplicate-detection-runs-endpoint}

Este endpoint permite consultar el historial de ejecuciones de detección de tareas duplicadas realizadas sobre un proyecto.

A diferencia del endpoint `latest`, que sólo devuelve la ejecución más reciente, este endpoint devuelve todas las ejecuciones registradas para el proyecto, ordenadas desde la más reciente hasta la más antigua.

Se utiliza cuando el frontend necesita mostrar historial, auditoría o permitir que el manager revise análisis anteriores.

## **Endpoint** {#endpoint-17}

GET /api/projects/{projectId}/ai/duplicate-detection/runs

## **Path Parameter** {#path-parameter-10}

| Parameter | Type | Description |
| ----- | ----- | ----- |
| `projectId` | String HEX UUID | Identificador único del proyecto |

Ejemplo:

/api/projects/70BD1C78282D46BF913A573354FA3D55/ai/duplicate-detection/runs

## **Body** {#body-5}

Este endpoint no requiere body.

## **Autenticación** {#autenticación-24}

Este endpoint requiere autenticación mediante JWT Token.

Header requerido:

Authorization: Bearer \<JWT\_TOKEN\>

El token se obtiene previamente mediante:

POST /auth/login

## **Ejemplo de Request** {#ejemplo-de-request-29}

curl \-X GET "http://localhost:8080/api/projects/70BD1C78282D46BF913A573354FA3D55/ai/duplicate-detection/runs" \\

\-H "Authorization: Bearer \<JWT\_TOKEN\>"

## **Ejemplo de Response** {#ejemplo-de-response-26}

\[

 {

   "completedAt": "2026-04-28T02:21:59.449032",

   "createdAt": "2026-04-28T02:21:50.941610",

   "errorMessage": null,

   "projectId": "70BD1C78282D46BF913A573354FA3D55",

   "runId": "E497C0244B594322ADE48FD71AA0D5E4",

   "status": "COMPLETED",

   "tasksAnalyzed": 77,

   "threshold": 0.8

 },

 {

   "completedAt": null,

   "createdAt": "2026-04-28T02:09:40.227170381",

   "errorMessage": null,

   "projectId": "70BD1C78282D46BF913A573354FA3D55",

   "runId": "4627CA7CDE1A437B9848E4236FACBDFA",

   "status": "PENDING",

   "tasksAnalyzed": 77,

   "threshold": 0.8

 }

\]

## **Campos de respuesta** {#campos-de-respuesta-14}

| Campo | Tipo | Descripción |
| ----- | ----- | ----- |
| `runId` | String HEX UUID | Identificador único de la ejecución de detección |
| `projectId` | String HEX UUID | Proyecto analizado |
| `status` | String | Estado actual o final de la ejecución |
| `threshold` | Double | Umbral de similitud usado en esa ejecución |
| `tasksAnalyzed` | Integer | Número de tareas enviadas al análisis |
| `createdAt` | DateTime | Fecha y hora en que inició la ejecución |
| `completedAt` | DateTime / null | Fecha y hora en que terminó la ejecución |
| `errorMessage` | String / null | Mensaje de error si la ejecución falló |

## **Estados posibles** {#estados-posibles-2}

| Estado | Descripción |
| ----- | ----- |
| `PENDING` | La ejecución fue creada y enviada a Kafka, pero aún no se ha recibido respuesta |
| `COMPLETED` | La ejecución terminó correctamente y sus resultados fueron guardados |
| `FAILED` | La ejecución falló durante el procesamiento |

## **Comportamiento esperado** {#comportamiento-esperado-4}

Este endpoint consulta la tabla:

AI\_TASK\_DUPLICATE\_DETECTION\_RUN

y devuelve todas las ejecuciones asociadas al proyecto.

El backend ordena las ejecuciones por fecha de creación descendente, por lo que el primer elemento del arreglo representa la ejecución más reciente.

Este endpoint no devuelve los resultados individuales de duplicados. Para obtener los resultados de una ejecución específica se debe usar:

GET /api/projects/{projectId}/ai/duplicate-detection/runs/{runId}/results

## **Ejemplo de uso en Frontend JavaScript** {#ejemplo-de-uso-en-frontend-javascript-8}

const token \= localStorage.getItem("token");

const projectId \= "70BD1C78282D46BF913A573354FA3D55";

const response \= await fetch(

 \`/api/projects/${projectId}/ai/duplicate-detection/runs\`,

 {

   method: "GET",

   headers: {

     Authorization: \`Bearer ${token}\`

   }

 }

);

const runs \= await response.json();

console.log("Historial de detecciones:", runs);

## **Posibles respuestas de error** {#posibles-respuestas-de-error-10}

### **400 Bad Request** {#400-bad-request-9}

El `projectId` tiene formato inválido.

{

 "error": "ProjectId inválido"

}

### **401 Unauthorized** {#401-unauthorized-10}

El token no fue enviado o es inválido.

{

 "error": "Unauthorized"

}

### **500 Internal Server Error** {#500-internal-server-error-10}

Error interno del backend.

{

 "error": "Error interno del servidor"

}

## **Uso esperado en la UI** {#uso-esperado-en-la-ui-10}

Este endpoint se utiliza cuando el manager o admin necesita ver el historial de análisis de duplicados ejecutados sobre un proyecto.

Uso esperado:

1. El frontend muestra una sección como **“Historial de detección de duplicados”**.  
2. La UI llama:

GET /api/projects/{projectId}/ai/duplicate-detection/runs

3. El backend devuelve las ejecuciones ordenadas de más reciente a más antigua.  
4. El usuario selecciona una ejecución.  
5. La UI consulta los resultados de esa ejecución usando:

GET /api/projects/{projectId}/ai/duplicate-detection/runs/{runId}/results

## **Sugerencia para el frontend** {#sugerencia-para-el-frontend-9}

La UI puede mostrar cada ejecución como una fila de tabla:

| Fecha | Estado | Tareas analizadas | Threshold | Acción |
| ----- | ----- | ----- | ----- | ----- |
| 2026-04-28 02:21 | COMPLETED | 77 | 0.80 | Ver resultados |
| 2026-04-28 02:09 | PENDING | 77 | 0.80 | Ver estado |

Para MVP, este endpoint es útil pero no obligatorio en la pantalla principal. La vista principal puede usar `latest`, mientras que este endpoint puede quedar para una sección de historial o auditoría.

# **AI Duplicate Detection Results by Run Endpoint** {#ai-duplicate-detection-results-by-run-endpoint}

Este endpoint permite consultar los resultados de una ejecución específica de detección de tareas duplicadas.

Se utiliza cuando el frontend ya conoce el `runId`, por ejemplo después de consultar el historial de ejecuciones con:

GET /api/projects/{projectId}/ai/duplicate-detection/runs

A diferencia de `latest`, este endpoint no busca la ejecución más reciente. Devuelve únicamente los resultados asociados al `runId` solicitado.

## **Endpoint** {#endpoint-18}

GET /api/projects/{projectId}/ai/duplicate-detection/runs/{runId}/results

## **Path Parameters** {#path-parameters-1}

| Parameter | Type | Description |
| ----- | ----- | ----- |
| `projectId` | String HEX UUID | Identificador único del proyecto |
| `runId` | String HEX UUID | Identificador único de la ejecución de detección |

Ejemplo:

/api/projects/70BD1C78282D46BF913A573354FA3D55/ai/duplicate-detection/runs/E497C0244B594322ADE48FD71AA0D5E4/results

## **Body** {#body-6}

Este endpoint no requiere body.

## **Autenticación** {#autenticación-25}

Este endpoint requiere autenticación mediante JWT Token.

Header requerido:

Authorization: Bearer \<JWT\_TOKEN\>

El token se obtiene previamente mediante:

POST /auth/login

## **Ejemplo de Request** {#ejemplo-de-request-30}

curl \-X GET "http://localhost:8080/api/projects/70BD1C78282D46BF913A573354FA3D55/ai/duplicate-detection/runs/E497C0244B594322ADE48FD71AA0D5E4/results" \\

\-H "Authorization: Bearer \<JWT\_TOKEN\>"

## **Ejemplo de Response** {#ejemplo-de-response-27}

\[

 {

   "createdAt": "2026-04-28T02:21:59.447578",

   "projectId": "70BD1C78282D46BF913A573354FA3D55",

   "reason": "Ambas tareas se centran en la creación de la tabla TAREA y su estructura.",

   "resultId": "5D749B3CA6754BBAA55F2C301B95F61E",

   "runId": "E497C0244B594322ADE48FD71AA0D5E4",

   "similarityScore": 0.85,

   "taskAId": "4FA9D93F9F61AEBAE063F862000A9F1C",

   "taskATitle": "Crear tabla TAREA con constraints",

   "taskBId": "4FA9E940A9E3BA06E063F862000AF904",

   "taskBTitle": "Implementar entidad TaskEntity"

 },

 {

   "createdAt": "2026-04-28T02:21:59.447660",

   "projectId": "70BD1C78282D46BF913A573354FA3D55",

   "reason": "Ambas tareas implican la creación de tablas relacionadas con la gestión de tareas.",

   "resultId": "EEB81A3DC62147439024510FEED9EF17",

   "runId": "E497C0244B594322ADE48FD71AA0D5E4",

   "similarityScore": 0.82,

   "taskAId": "4FA9D93F9F63AEBAE063F862000A9F1C",

   "taskATitle": "Crear tabla relación usuario-tarea",

   "taskBId": "4FA9B2D1269B8055E063F862000A04F0",

   "taskBTitle": "Crear tablas de catálogo"

 },

 {

   "createdAt": "2026-04-28T02:21:59.447673",

   "projectId": "70BD1C78282D46BF913A573354FA3D55",

   "reason": "Ambas tareas están relacionadas con la autenticación y la gestión de usuarios.",

   "resultId": "91A6C47213814D6595525B191A6AE1EA",

   "runId": "E497C0244B594322ADE48FD71AA0D5E4",

   "similarityScore": 0.81,

   "taskAId": "4FA9BEB0611A8057E063F862000A40ED",

   "taskATitle": "Crear DTOs de autenticación",

   "taskBId": "4FA9BEB0611B8057E063F862000A40ED",

   "taskBTitle": "Implementar servicio de autenticación"

 }

\]

## **Campos de respuesta** {#campos-de-respuesta-15}

| Campo | Tipo | Descripción |
| ----- | ----- | ----- |
| `resultId` | String HEX UUID | Identificador único del resultado |
| `runId` | String HEX UUID | Ejecución de detección a la que pertenece el resultado |
| `projectId` | String HEX UUID | Proyecto asociado |
| `taskAId` | String HEX UUID | Identificador de la primera tarea comparada |
| `taskATitle` | String | Título snapshot de la primera tarea |
| `taskBId` | String HEX UUID | Identificador de la segunda tarea comparada |
| `taskBTitle` | String | Título snapshot de la segunda tarea |
| `similarityScore` | Double | Nivel de similitud detectado por IA |
| `reason` | String | Explicación breve de por qué las tareas podrían estar duplicadas |
| `createdAt` | DateTime | Fecha y hora en que se guardó el resultado |

## **Comportamiento esperado** {#comportamiento-esperado-5}

Este endpoint consulta los resultados guardados en:

AI\_TASK\_DUPLICATE\_RESULT

filtrando por el `runId` recibido.

Si el análisis terminó correctamente y encontró posibles duplicados, devuelve un arreglo con resultados.

Si el análisis terminó correctamente pero no encontró duplicados, devuelve:

\[\]

Si el análisis aún está `PENDING`, también puede devolver:

\[\]

porque todavía no existen resultados asociados al `runId`.

## **Ejemplo de uso en Frontend JavaScript** {#ejemplo-de-uso-en-frontend-javascript-9}

const token \= localStorage.getItem("token");

const projectId \= "70BD1C78282D46BF913A573354FA3D55";

const runId \= "E497C0244B594322ADE48FD71AA0D5E4";

const response \= await fetch(

 \`/api/projects/${projectId}/ai/duplicate-detection/runs/${runId}/results\`,

 {

   method: "GET",

   headers: {

     Authorization: \`Bearer ${token}\`

   }

 }

);

const results \= await response.json();

console.log("Resultados de la ejecución:", results);

## **Posibles respuestas de error** {#posibles-respuestas-de-error-11}

### **400 Bad Request** {#400-bad-request-10}

El `runId` tiene formato inválido.

{

 "error": "RunId inválido"

}

La ejecución no existe.

{

 "error": "Duplicate detection run not found"

}

### **401 Unauthorized** {#401-unauthorized-11}

El token no fue enviado o es inválido.

{

 "error": "Unauthorized"

}

### **500 Internal Server Error** {#500-internal-server-error-11}

Error interno del backend.

{

 "error": "Error interno del servidor"

}

## **Uso esperado en la UI** {#uso-esperado-en-la-ui-11}

Este endpoint se utiliza cuando el usuario selecciona una ejecución específica del historial.

Uso esperado:

1. El frontend consulta el historial con:

GET /api/projects/{projectId}/ai/duplicate-detection/runs

2. El manager selecciona una ejecución.  
3. El frontend llama:

GET /api/projects/{projectId}/ai/duplicate-detection/runs/{runId}/results

4. La UI muestra los pares de tareas posiblemente duplicadas.

## **Sugerencia para el frontend** {#sugerencia-para-el-frontend-10}

Este endpoint es ideal para una vista de auditoría o historial.

La UI puede mostrar cada resultado como una comparación entre dos tareas:

Posible duplicado detectado

Tarea A:

Crear tabla TAREA con constraints

Tarea B:

Implementar entidad TaskEntity

Similitud:

85%

Motivo:

Ambas tareas se centran en la creación de la tabla TAREA y su estructura.


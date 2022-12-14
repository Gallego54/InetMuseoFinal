import Router from "./Router.js";

import  {
  registrarExposicion,
  editarExposicion,
  listarExposicion,
  cambiarEstadoExpo
}  from "../controllers/exposicion.controller.js";

import {
  registrarUsuarioAdmin,
  confirmarUsuarioAdmin,
  cambiarEstadoAdmin
} from "../controllers/admin.controller.js";

import {
  GuiaRegister,
  cambiarEstadoGuia,
  ListarGuias
} from "../controllers/guia.controller.js";

import {
  registrarHabitacion,
  editarHabitacion,
  cambiarEstadoHabitacion,
  listarHabitacion
} from "../controllers/habitacion.controller.js";

import {
  IdiomaRegister,
  listarIdioma,
  cambiarEstadoIdioma
} from "../controllers/idioma.controller.js";

import {
  InscripcionCreate,
  InscripcionView,
  cambiarEstadoInscripcion
} from "../controllers/inscripcion.controller.js";

import {
  VisitaGuiadaRegister,
  VisitaGuiadaView,
  cambiarEstadoVisitaGuiada
} from "../controllers/visita.guiada.controller.js";

import {
  listarVisitante,
  cambiarEstadoVisitante,
  VisitanteRegister
} from "../controllers/visitante.contoller.js";

const router = Router();

//RUTAS EXPOSICION
router.post('registrarExposicion', registrarExposicion)
router.patch('editarExposicion', editarExposicion)
router.get('listarExposicion', listarExposicion)
router.patch('cambiarEstadoExpo', cambiarEstadoExpo);

//RUTAS ADMIN
router.post('registrarUsuarioAdmin', registrarUsuarioAdmin );
router.post('confirmarUsuarioAdmin', confirmarUsuarioAdmin);
router.patch('cambiarEstadoAdmin', cambiarEstadoAdmin);

//RUTAS GUIAS 
router.post('GuiaRegister', GuiaRegister );
router.patch('cambiarEstadoGuia', cambiarEstadoGuia );
router.get('ListarGuias', ListarGuias );

//RUTAS HABITACION
router.get('listarHabitacion',listarHabitacion)
router.post('registrarHabitacion', registrarHabitacion );
router.patch('editarHabitacion', editarHabitacion);
router.patch('cambiarEstadoHabitacion', cambiarEstadoHabitacion);

//RUTAS IDIOMA
router.post('idiomaRegister', IdiomaRegister );
router.patch('cambiarEstadoIdioma', cambiarEstadoIdioma);
router.get('listarIdioma', listarIdioma);

//RUTAS INCRIPCION
router.post('InscripcionCreate', InscripcionCreate );
router.patch('cambiarEstadoInscripcion', cambiarEstadoInscripcion);
router.get('InscripcionView', InscripcionView );

//RUTAS VISITAS GUIADAS
router.post('VisitaGuiadaRegister', VisitaGuiadaRegister );
router.patch('cambiarEstadoVisitaGuiada',cambiarEstadoVisitaGuiada );
router.get('VisitaGuiadaView', VisitaGuiadaView );

//RUTAS VISITANTE
router.get('listarVisitante',listarVisitante );
router.patch('cambiarEstadoVisitante',cambiarEstadoVisitante);
router.post('VisitanteRegister', VisitanteRegister);

export default router;
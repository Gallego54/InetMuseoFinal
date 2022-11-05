import { FormController } from "../../../controller/Form";
import { SessionController } from "../../../controller/Session";

import { ElementGenerator } from "../../../services/render.service";

import viewService from "../../../services/view.service";

import createCard from "../../../widget/card/handler/CardHandler";
import createRecordlist from "../../../widget/recordlist/handler/RecordListHandler";


const Generator = new ElementGenerator();

const idSalasTemplate = 'admin_view-salas'
function getSalasView ( callerSalasView ) {
    const SalasView = viewService().getClonedView(idSalasTemplate);
    const CardRoot = SalasView.querySelector('#row-2');
    
    
    // CardHandlerInstance Edit
    const cardEditReference = SalasView.querySelector('#edit-card-content-sala');
    const cardEditHandler = createCard ( event => {
        event.preventDefault();
        alert('En desarrollo...');
        
    }, cardEditReference)

    // CardHandlerInstance Submit
    const cardSubmitReference = SalasView.querySelector('#submit-card-content-sala');
    const cardSubmitHandler = createCard (event => {
        event.preventDefault();
        const data = new FormData(event.target);
        const dataParse = [...data.values()]

        const APIPOST_registrarSalas = '/registrarHabitacion';
        FormController().sendForm({url: APIPOST_registrarSalas, method:'POST' }, {
            'idInstitucion': 1,
            'identificador': dataParse[0],
        }, ['', undefined]).then(msg => {
            callerSalasView();
            alert(msg.success);
        }).catch(msg => alert(msg.error))
    }, cardSubmitReference)


    // RecordlistInstance
    const RecordListRoot = SalasView.querySelector('#recordlist-container');
    const APIGET_ListSalas = '/listarHabitacion';
    const RecordList_Guias = createRecordlist(APIGET_ListSalas, {
        headNames: ['DESCRIPCION'],
        keys: {primaryKey: 'idHabitacion', partialKeys: ['identificador']},
        operationElements: [{
            element: Generator.makeElement('button', {id: 'put-table-button', class: 'put-button'}, ['Editar']),
            listenEvent: 'click',
            handlerEvent: event => {
                Generator.removeAllElements(CardRoot);
                CardRoot.appendChild(cardEditHandler.getCard())
            }
        }, {
            element: Generator.makeElement('button', {id: 'delete-table-button', class: 'delete-button'}, ['Eliminar']),
            listenEvent: 'click',
            handlerEvent: event => {
                const APIDEL_deleteSalas = '/cambiarEstadoHabitacion';
                FormController().sendForm({url: APIDEL_deleteSalas, method:'PATCH' }, {
                    'idHabitacion': event.target.value,
                }, []).then(msg => {
                    callerSalasView();
                    alert(msg.success);
                }).catch(msg => alert(msg.error))
            }
        }]
    });

    

    const ButtonAdd = SalasView.querySelector('#add-table-button');
    const buttonAddHandler = e => {
        Generator.removeAllElements(CardRoot);
        CardRoot.appendChild(cardSubmitHandler.getCard())
    }

    ButtonAdd.addEventListener ('click', buttonAddHandler)
    RecordListRoot.appendChild(RecordList_Guias.getRecordlist());

    return SalasView;
}   


export default function safeGetSalasView ( callerSalasView ) {
    if(SessionController().checkSession()){
        return getSalasView( callerSalasView );
    } return Generator.makeElement('h1', {style: 'color: red; font-size: 24px;'}, ['SESSION FAIL']);
}
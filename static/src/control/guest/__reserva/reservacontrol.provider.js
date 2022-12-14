import { ElementGenerator } from "../../../helpers/render.helper";

import viewService from "../../../services/view.service";

import { FormController } from "../../../controller/Form";

import createRecordlist from "../../../custom/widget/recordlist/RecordlistWidget.provider";
import createCard from "../../../custom/widget/card/CardWidget.provider";


import SaveContent from "../../../controller/SaveContent";



const Generator =  ElementGenerator ();


const idNavElement = 'guest-reserva';
const idReservaTemplate = 'guest_view-reserva';

export default function getReservaControl () {
    const ReservaView = viewService().getClonedView(idReservaTemplate);
    const CardRoot = ReservaView.querySelector('#row-2');
    
    // CardHandlerInstance Submit
    const cardSubmitReference = ReservaView.querySelector('#card-content-reserva');
    const cardSubmitHandler = setHomeSubmitCard(cardSubmitReference);

    const ButtonAdd = Generator.makeElement('button', { id: 'pop-table-button', class: 'form-submit-xl'}, ['Subscribirme']);  
    const ButtonAddListener = event  => {
        Generator.removeAllElements(CardRoot);
        const cardSubmitElement = cardSubmitHandler.getCard();

        cardSubmitElement.setAttribute('idVisitaGuiada', event.target.value);
        // console.log(cardSubmitElement)

        CardRoot.appendChild(cardSubmitElement)
    }
    // RecordlistInstance
    const RecordListRoot = ReservaView.querySelector('#row-1');
    const APIGET_VisitaGuiadaList ='/VisitaGuiadaView';
    const recordList = createRecordlist(APIGET_VisitaGuiadaList, {headNames: ['Fecha', 'Hora', 'Idioma', 'SUBSCRIBIRME'], 
    keys: {
        primaryKey: 'idVisitaGuiada',
        partialKeys:['fecha', 'hora', 'idioma']
    }, operationElements: [{
        element: ButtonAdd,
        listenEvent: 'click',
        handlerEvent: ButtonAddListener
    }]});


        
    SaveContent.saveContent('guest-reserva', {'cardsubmit': cardSubmitHandler});
    RecordListRoot.appendChild(recordList.getRecordlist());
    return ReservaView;
}

function setHomeSubmitCard ( cardSubmitReference ) {
    const savedContent = SaveContent.getContent('guest-reserva');
    const newCardSubmitHandler = 
    createCard (event => {
        event.preventDefault();
        const dataParse = []
        const Form = event.target;  
        Form.querySelectorAll('#content-container > input').forEach(element => {
            dataParse.push(element.value);
        });

        const APIPOST_crearInscripcion ='/InscripcionCreate';
        FormController().sendForm({url: APIPOST_crearInscripcion, method:'POST' }, {
            idVisitaGuiada: event.target.getAttribute('idVisitaGuiada'),
            nombre: dataParse[1],
            apellido: dataParse[2],
            dni: dataParse[3],
            mail: dataParse[0],
            cantPersonas: dataParse[4]
        }, ['', undefined]).then(msg => {
            document.getElementById(idNavElement).dispatchEvent(new Event('click'));
            SaveContent.clearContent('guest-reserva');
            alert(msg.success)
        }).catch(msg => alert(msg.error))
    }, cardSubmitReference);

    return savedContent!==undefined
    ? savedContent.cardsubmit 
    : newCardSubmitHandler
}
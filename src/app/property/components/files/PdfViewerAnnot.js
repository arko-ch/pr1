import React, { useRef, useEffect } from 'react';
import WebViewer from '@pdftron/webviewer';
import './PdfViewer.css';
import config from '../../../../../src/config/config'; //  '../../config/config';
import { crud } from '../../../../../src/app/services/crud'; //'../../../app/services/crud';
//import GenQrCode from './QrCodeGen'
//import React from "react";
import QRious from 'qrious';

// will transform this to reusable component
const PdfViewer = props => {
  const viewer = useRef(null);
  const $qrcodes = crud('qrcodes');

  // if using a class, equivalent of componentDidMount
  useEffect(() => {
    //console.log('docid',props.docId)

    WebViewer(
      {
        path: '/static/webviewer/lib', //'/webviewer/lib' 07/07/20 - will check on the public folder access,
        initialDoc: props.wasabi,
        fullAPI: true,
        showLocalFilePicker: true
        //Author:props.annotationUser
      },
      viewer.current
    ).then(instance => {
      const { docViewer, Annotations } = instance;
      const annotManager = docViewer.getAnnotationManager();
      annotManager.setCurrentUser(props.annotationUser);
      const signatureTool = docViewer.getTool('AnnotationCreateSignature');

      annotManager.on('annotationChanged', function(annots, action, options) {
        // If the event is triggered by importing then it can be ignored
        // This will happen when importing the initial annotations from the server or individual changes from other users
        if (options.imported) return;
        //console.log('props.annotationUser',props.annotationUser)
        annotManager.exportAnnotCommand().then(function(xfdfStrings) {
          //alert(xfdfStrings)
          console.log('xfdfStrings', xfdfStrings);

          annotManager.setCurrentUser(props.annotationUser);
          annots.forEach(function(annot) {
            savexfdfString(props.docId, annot.Id, xfdfStrings);
          });
        });
      });

      docViewer.on('documentLoaded', () => {
        loadxfdfStrings(props.docId).then(function(rows) {
          console.log('props.annotationUser', props.annotationUser);
          JSON.parse(rows).forEach(col => {
            console.log('rows', rows);
            annotManager
              .importAnnotCommand(col.xfdfString)
              .then(function(annotations) {
                annotManager.drawAnnotationsFromList(annotations);
              });
          });
        });
        signatureTool.importSignatures(localStorage.getItem('qrcode'));
        // localStorage.removeItem('qrcodeflag');

        const qrCodeCheckData = fetchQrCode();
        qrCodeCheckData
          .then(qrCodeData => {
            if (qrCodeData == 0) {
              instance.setHeaderItems(header => {
                const items = header.getItems();
                items.splice(10, 0, {
                  type: 'actionButton',
                  img:
                    'https://s3.wasabisys.com/app-assets/qrcodepdftronbutton-asset.png', //'https://www.pdftron.com/favicon-200.png',
                  //'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',

                  onClick: () => {
                    const stampAnnot = new Annotations.StampAnnotation();

                    stampAnnot.PageNumber = 1;
                    stampAnnot.Y = 250;
                    stampAnnot.Width = 180;
                    stampAnnot.Height = 180;
                    stampAnnot.ImageData = localStorage.getItem('qrcode');
                    stampAnnot.Author = annotManager.getCurrentUser();

                    annotManager.addAnnotation(stampAnnot);
                    annotManager.redrawAnnotation(stampAnnot);

                    let propertyIdFromURL = window.location.href.toString();
                    var propertyIdFromURLArray = propertyIdFromURL.split('/');
                    propertyIdFromURL =
                      propertyIdFromURLArray[propertyIdFromURLArray.length - 1];

                    new QRious({
                      element: document.getElementById('qr-div'),
                      value:
                        /*  "http://dev.settlementapp99.com/qr " +
                   JSON.stringify(propertyIdFromURL), */
                        /* 
                   "Scalable Legal - Entitled App (c) 2020 -- placeholder | " +
                   JSON.stringify(propertyIdFromURL), */

                        `http://dev.settlementapp99.com/#/pages/QrCodesData/` +
                        props.docId

                      //propertyIdFromURL
                    });

                    localStorage.removeItem('qrcode');
                    const canvas = document.getElementById('qr-div');
                    const pngUrl = canvas
                      .toDataURL('image/png')
                      .replace('image/png', 'image/octet-stream');
                    localStorage.setItem('qrcode', pngUrl);
                    let me = pngUrl;
                    //  console.log('me base54 locastorage',localStorage.getItem('qrcode')

                    saveQrCode(
                      //propertyIdFromURL,
                      props.docId,
                      stampAnnot.ImageData,
                      stampAnnot.DateCreated,
                      props.annotationUser,
                      stampAnnot.Author,
                      stampAnnot.Id,
                      stampAnnot.DateModified,
                      stampAnnot.Icon,
                      stampAnnot.elementName
                    );
                  }
                });
                header.update(items);
              }); //
            }
          })
          .catch(error => {
            console.error(error, 'Session not found');
          });

        // Disabled the data-elements in the qrCode annotation
        instance.disableElements([
          'Button ActionButton',
          'annotationCommentButton',
          'annotationStyleEditButton',
          'annotationDeleteButton',
          'linkButton'
        ]);
      });

      const fetchQrCode = async () => {
        // console.log('props. docId',props.docId)
        //  let documentId = window.location.href.toString();
        //  var documentIdArray = documentId.split('/');

        let documentId = props.docId; //documentIdArray[documentIdArray.length - 1];
        const res = await $qrcodes.findOneDocId(documentId);
        return res.data.length;
      };

      /*   const fetchQrCode = async () => {
        let documentId = window.location.href.toString();
        var documentIdArray = documentId.split('/');
        documentId = documentIdArray[documentIdArray.length - 1];
        const res = await $qrcodes.findOneDocId(documentId);

        if (res.data.length > 0) {
          localStorage.setItem('qrcodeflag', 1);
          console.log('res lookup 1', res.data.length);
        } else {
          localStorage.setItem('qrcodeflag', 0);
          console.log('res lookup 0', res.data.length);
        }
      }; */
    });
  }, []);

  //Make a POST request with the QR code
  const saveQrCode = (
    documentId,
    code,
    datePrinted,
    createdBy,
    printedBy,
    module,
    dateArchive,
    description1,
    description2,
    binLocation
  ) => {
    let jsonbody = {};
    jsonbody = {
      documentId: documentId,
      code: code,
      datePrinted: datePrinted,
      createdBy: createdBy,
      printedBy: printedBy,
      module: module,
      dateArchive: dateArchive,
      description1: description1,
      description2: description2,
      binLocation: 'Folder 1'
    };
    fetch(config.returnEnv() + 'qrcodes', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonbody)
    });
    console.log('JSON.stringify(jsonbody)', JSON.stringify(jsonbody));
  };

  // Make a POST request with document ID, annotation ID and XFDF string//

  const savexfdfString = (documentId, annotationId, xfdfString) => {
    const xfdfStringTest = xfdfString.replace(/\'/g, `''`);
    const isDeleteCommand = /<delete>(.*)<\/delete>/s.test(xfdfStringTest);

    if (isDeleteCommand) {
      //  fetch(config.returnEnv() + `pdftronannots?annotationId=${annotationId}`, 7373fc5d-baf3-803c-a0ac-9a7f284bd898
      fetch(
        config.returnEnv() +
          'pdftronannots/annotationId/' +
          annotationId.toString(),
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('delete');
    } else {
      let jsonbody = {};
      jsonbody = {
        documentId: documentId,
        annotationId: annotationId,
        xfdfString: xfdfString
      };
      fetch(config.returnEnv() + 'pdftronannots', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonbody)
      });
      console.log('JSON.stringify(jsonbody)', JSON.stringify(jsonbody));
    }
  };

  // Make a GET request to get XFDF string //  fetch(config.returnEnv() + `pdftronannots?annotationId=${annotationId}`, 7373fc5d-baf3-803c-a0ac-9a7f284bd898
  var loadxfdfStrings = function(documentId) {
    return new Promise(function(resolve) {
      //fetch(`/server/annotationHandler.js?documentId=${documentId}`, {
      //        method: 'GET'
      //    })
      fetch(config.returnEnv() + `pdftronannots?documentId=${documentId}`).then(
        function(res) {
          if (res.status === 200) {
            res.text().then(function(xfdfStrings) {
              resolve(xfdfStrings);
            });
          }
        }
      );
    });
  };

  return (
    <>
      <div>
        <canvas id="qr-div" />
        <br />
      </div>
      <div className="PdfViewer">
        <div className="webviewer" ref={viewer}></div>
      </div>
    </>
  );
};
export default PdfViewer;
//fetch(`/server/annotationHandler.js?documentId=${documentId}`, {
//        method: 'GET'
//    }) -- backend for qrcode

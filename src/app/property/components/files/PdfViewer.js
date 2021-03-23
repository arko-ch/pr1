import React, { useRef, useEffect, useState } from 'react';
import WebViewer from '@pdftron/webviewer';
import './PdfViewer.css';
// will transform this to reusable component
const PdfViewer = props => {
  const viewer = useRef(null);
  // if using a class, equivalent of componentDidMount
  useEffect(() => {
    WebViewer(
      {
        path: '/static/webviewer/lib', //'/webviewer/lib' 07/07/20 - will check on the public folder access,
        initialDoc: props.wasabi,
        fullAPI: true,
        showLocalFilePicker: true
      },
      viewer.current
    ).then(instance => {
      const { docViewer, Annotations } = instance;
      const annotManager = docViewer.getAnnotationManager();

      docViewer.on('documentLoaded', () => {
        const rectangleAnnot = new Annotations.RectangleAnnotation();
        rectangleAnnot.PageNumber = 1;
        // values are in page coordinates with (0, 0) in the top left
        rectangleAnnot.X = 100;
        rectangleAnnot.Y = 150;
        rectangleAnnot.Width = 200;
        rectangleAnnot.Height = 50;
        rectangleAnnot.Author = annotManager.getCurrentUser();

        annotManager.addAnnotation(rectangleAnnot);
        // need to draw the annotation otherwise it won't show up until the page is refreshed
        annotManager.redrawAnnotation(rectangleAnnot);
      });
    });
  }, []);
  return (
    <>
      <div className="PdfViewer">
        <div className="webviewer" ref={viewer}></div>
      </div>
    </>
  );
};
export default PdfViewer;

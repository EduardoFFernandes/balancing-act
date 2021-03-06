// Copyright 2013-2020, University of Colorado Boulder

/**
 * This class defines a Scenery node that represents a model element in the
 * view, and the particular model element itself contains an image that is used
 * as the primary representation.
 *
 * @author John Blanco
 */

import Matrix3 from '../../../../dot/js/Matrix3.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import inherit from '../../../../phet-core/js/inherit.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import defaultImage from '../../../images/default-image_png.js';
import balancingActStrings from '../../balancingActStrings.js';
import balancingAct from '../../balancingAct.js';
import BAQueryParameters from '../BAQueryParameters.js';
import ColumnState from '../model/ColumnState.js';
import MassDragHandler from './MassDragHandler.js';
import RasterizedTextNode from './RasterizedTextNode.js';

const kgString = balancingActStrings.kg;
const pattern0Value1UnitsString = balancingActStrings.pattern0Value1Units;
const unknownMassLabelString = balancingActStrings.unknownMassLabel;

/**
 * @param imageMass
 * @param modelViewTransform
 * @param {boolean} isLabeled - Flag that controls whether this note include a textual label of the mass
 * @param massLabelVisibleProperty
 * @param {boolean} draggable
 * @param {EnumerationProperty.<ColumnState>} columnStateProperty
 * @constructor
 */
function ImageMassNode( imageMass, modelViewTransform, isLabeled, massLabelVisibleProperty, draggable, columnStateProperty ) {
  Node.call( this, { cursor: 'pointer' } );
  BAQueryParameters.stanford && columnStateProperty.link( columnState => {
    this.cursor = columnState === ColumnState.DOUBLE_COLUMNS ? 'pointer' : 'default';
    this.pickable = columnState === ColumnState.DOUBLE_COLUMNS;
  } );
  const self = this;

  if ( isLabeled ) {

    // Add the mass indicator label.  Note that it is positioned elsewhere.
    const massLabelText = imageMass.isMystery ? unknownMassLabelString : StringUtils.format(
      pattern0Value1UnitsString, imageMass.massValue, kgString );
    var massLabel = new RasterizedTextNode(
      massLabelText,
      { font: new PhetFont( 12 ) },
      { pickable: false } // this is done as a workaround for an issue with RasterizedTextNode, can be made pickable if replaced with Text
    );
    self.addChild( massLabel );

    // Observe changes to mass indicator label visibility.
    massLabelVisibleProperty.link( function( visible ) {
      massLabel.visible = visible;
    } );
  }

  const imageNode = new Image( defaultImage );

  // Observe image changes.
  imageMass.imageProperty.link( function( image ) {
    imageNode.setScaleMagnitude( 1 );
    imageNode.setImage( image );

    // Flip the image if reversed, or un-reverse it if it shouldn't be reversed.
    if ( ( imageMass.reverseImage && imageNode.matrix.getDeterminant() > 0 ) ||
         ( !imageMass.reverseImage && imageNode.matrix.getDeterminant() < 0 ) ) {
      imageNode.matrix = imageNode.matrix.timesMatrix( Matrix3.scaling( -1, 1 ) );
    }

    const scalingFactor = Math.abs( modelViewTransform.modelToViewDeltaY( imageMass.heightProperty.get() ) ) /
                          imageNode.height;
    imageNode.scale( scalingFactor );
    imageNode.centerX = 0;
    if ( isLabeled ) {
      massLabel.maxWidth = imageNode.width;
      massLabel.centerX = imageNode.centerX + modelViewTransform.modelToViewDeltaX( imageMass.centerOfMassXOffset );
      massLabel.bottom = imageNode.top;
    }
    updatePositionAndAngle();
  } );

  // Function for updating position and angle, used in multiple places below.
  function updatePositionAndAngle() {
    if ( self.bounds.isFinite() ) {

      self.rotation = 0;
      const imageMassPosition = imageMass.positionProperty.get();

      // Set overall position.  Recall that positions in the model are defined
      // as the center bottom of the item.
      self.centerX = modelViewTransform.modelToViewX( imageMassPosition.x - imageMass.centerOfMassXOffset );
      self.bottom = modelViewTransform.modelToViewY( imageMassPosition.y );

      // Set the rotation.  Rotation point is the center bottom.
      self.rotateAround(
        new Vector2(
          modelViewTransform.modelToViewX( imageMassPosition.x ),
          modelViewTransform.modelToViewY( imageMassPosition.y )
        ),
        -imageMass.rotationAngleProperty.get()
      );
    }
  }

  // Add the image node.
  self.addChild( imageNode );

  // Make the image node visible to descendant classes for layout purposes.
  this.imageNode = imageNode;

  // Observe height changes.
  imageMass.heightProperty.link( function( newHeight ) {
    imageNode.setScaleMagnitude( 1 );
    const scalingFactor = Math.abs( modelViewTransform.modelToViewDeltaY( newHeight ) ) / imageNode.height;
    imageNode.scale( scalingFactor );
    updatePositionAndAngle();
  } );

  // Observe position changes.
  imageMass.positionProperty.link( function() {
    updatePositionAndAngle();
  } );

  // Observe rotational angle changes.
  imageMass.rotationAngleProperty.link( function() {
    updatePositionAndAngle();
  } );

  // Make this non-pickable when animating so that users can't grab it mid-flight.
  imageMass.animatingProperty.link( function( animating ) {
    self.pickable = !animating;
  } );

  // Add the mouse event handler.
  if ( draggable ) {
    self.addInputListener( new MassDragHandler( imageMass, modelViewTransform ) );
  }
}

balancingAct.register( 'ImageMassNode', ImageMassNode );

inherit( Node, ImageMassNode );
export default ImageMassNode;
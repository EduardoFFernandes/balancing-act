// Copyright 2013-2020, University of Colorado Boulder

/**
 * A node that can be used to add an image-based mass element to the model by
 * clicking on it.
 *
 * @author John Blanco
 */


// module
import inherit from '../../../../phet-core/js/inherit.js';
import balancingAct from '../../balancingAct.js';
import BAQueryParameters from '../../common/BAQueryParameters.js';
import ColumnState from '../../common/model/ColumnState.js';
import MassCreatorNode from './MassCreatorNode.js';

/**
 * @param {BalanceLabModel} model
 * @param {ModelViewTransform2} modelViewTransform
 * @param {ImageMass} prototypeImageMass
 * @param {boolean} showMassLabel
 * @constructor
 */
function ImageMassCreatorNode( model, modelViewTransform, prototypeImageMass, showMassLabel, options ) {
  MassCreatorNode.call( this, modelViewTransform, prototypeImageMass.massValue, showMassLabel, options );
  this.prototypeImageMass = prototypeImageMass;
  this.model = model;

  // TODO: move this into ModelElementCreatorNode, see https://github.com/phetsims/balancing-act/issues/96
  BAQueryParameters.stanford && model.columnStateProperty.link( columnState => {
    this.cursor = columnState === ColumnState.DOUBLE_COLUMNS ? 'pointer' : 'default';
    this.pickable = columnState === ColumnState.DOUBLE_COLUMNS;
  } );
}

balancingAct.register( 'ImageMassCreatorNode', ImageMassCreatorNode );

inherit( MassCreatorNode, ImageMassCreatorNode, {

  /**
   * @param position
   * @returns {*}
   * @public
   */
  addElementToModel: function( position ) {
    const imageMassModelElement = this.createImageMassInstance();
    imageMassModelElement.positionProperty.set( position.copy() );
    imageMassModelElement.animationDestination = imageMassModelElement.positionProperty.get();
    imageMassModelElement.userControlledProperty.set( true );
    this.model.addMass( imageMassModelElement );
    return imageMassModelElement;
  },

  /**
   * Create an instance of the image mass that corresponds to this creator
   * node.  Overridden by subclasses to create the appropriate type.
   */
  createImageMassInstance: function() {
    return this.prototypeImageMass.createCopy();
  }
} );

export default ImageMassCreatorNode;
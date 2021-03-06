// Copyright 2013-2020, University of Colorado Boulder

/**
 * This class represents a "mystery mass" in a toolbox.  When the user clicks
 * on this node, the corresponding model element is added to the model at the
 * user's mouse position.
 *
 * @author John Blanco
 */

import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import inherit from '../../../../phet-core/js/inherit.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import balancingAct from '../../balancingAct.js';
import MysteryMass from '../../common/model/masses/MysteryMass.js';
import MysteryMassNode from '../../common/view/MysteryMassNode.js';
import ImageMassCreatorNode from './ImageMassCreatorNode.js';

// Model-view transform for scaling the node used in the toolbox.  This
// may scale the node differently than what is used in the model so that
// items in the toolbox can be sized differently (generally smaller).
const SCALING_MVT = ModelViewTransform2.createOffsetScaleMapping( Vector2.ZERO, 150 );

function MysteryMassCreatorNode( mysteryMassID, model, modelViewTransform, options ) {
  ImageMassCreatorNode.call( this, model, modelViewTransform, new MysteryMass( Vector2.ZERO, mysteryMassID, { tandem: Tandem.OPT_OUT } ), false, options );
  this.mysteryMassId = mysteryMassID;
  this.setSelectionNode( new MysteryMassNode( this.prototypeImageMass, SCALING_MVT, false, new Property( false ), false, model.columnStateProperty ) );
  this.positioningOffset = new Vector2( 0, -modelViewTransform.modelToViewDeltaY( this.prototypeImageMass.heightProperty.get() / 2 ) );
}

balancingAct.register( 'MysteryMassCreatorNode', MysteryMassCreatorNode );

inherit( ImageMassCreatorNode, MysteryMassCreatorNode, {

  /**
   * @param position
   * @returns {PhetioObject}
   * @override
   */
  addElementToModel: function( position ) {
    const mass = this.model.mysteryMassGroup.createNextElement( position, this.mysteryMassId );
    this.model.addMass( mass );
    return mass;
  }
} );

export default MysteryMassCreatorNode;

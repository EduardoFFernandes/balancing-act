// Copyright 2013-2018, University of Colorado Boulder

/**
 * This object type represents a stack of bricks in a toolbox.  When the user
 * clicks on this node, the corresponding model element is added to the model
 * at the user's mouse location.
 *
 * @author John Blanco
 */
define( require => {
  'use strict';

  // modules
  const balancingAct = require( 'BALANCING_ACT/balancingAct' );
  const BrickStack = require( 'BALANCING_ACT/common/model/masses/BrickStack' );
  const BrickStackNode = require( 'BALANCING_ACT/common/view/BrickStackNode' );
  const inherit = require( 'PHET_CORE/inherit' );
  const MassCreatorNode = require( 'BALANCING_ACT/balancelab/view/MassCreatorNode' );
  const ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  const Property = require( 'AXON/Property' );
  const Shape = require( 'KITE/Shape' );
  const Vector2 = require( 'DOT/Vector2' );

  // Model-view transform for scaling the node used in the toolbox.  This
  // may scale the node differently than what is used in the model so that
  // items in the toolbox can be sized differently (generally smaller).
  const SCALING_MVT = ModelViewTransform2.createOffsetScaleMapping( Vector2.ZERO, 150 );

  /**
   * @param {number} numBricks
   * @param {BalanceLabModel} model
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} [options]
   * @constructor
   */
  function BrickStackCreatorNode( numBricks, model, modelViewTransform, options ) {
    MassCreatorNode.call( this, modelViewTransform, numBricks * BrickStack.BRICK_MASS, true, options );
    this.numBricks = numBricks;
    this.model = model;
    const selectionNode = new BrickStackNode(
      new BrickStack( numBricks, Vector2.ZERO, false ),
      SCALING_MVT,
      false,
      new Property( false ),
      false
    );

    // Make a larger touch area.  The diameter of the circle was determined empirically.
    selectionNode.touchArea = Shape.circle(
      selectionNode.bounds.width / 2,
      selectionNode.bounds.height / 2,
      selectionNode.bounds.width * 0.8
    );

    this.setSelectionNode( selectionNode );
    this.positioningOffset = new Vector2( 0, -modelViewTransform.modelToViewDeltaY( BrickStack.BRICK_HEIGHT * numBricks / 2 ) );
  }

  balancingAct.register( 'BrickStackCreatorNode', BrickStackCreatorNode );

  return inherit( MassCreatorNode, BrickStackCreatorNode, {
    addElementToModel: function( position ) {
      const brickStack = new BrickStack( this.numBricks, position );
      brickStack.userControlledProperty.set( true );
      brickStack.animationDestination = position;
      this.model.addMass( brickStack );
      return brickStack;
    }
  } );
} );
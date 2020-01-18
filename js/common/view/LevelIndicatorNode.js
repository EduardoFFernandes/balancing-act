// Copyright 2013-2020, University of Colorado Boulder

/**
 * The level indicator shows triangles to the left and right of the plank to
 * help indicate whether the plank is at exactly 0 degrees.
 *
 * @author John Blanco
 */
define( require => {
  'use strict';

  // modules
  const balancingAct = require( 'BALANCING_ACT/balancingAct' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Matrix3 = require( 'DOT/Matrix3' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Plank = require( 'BALANCING_ACT/common/model/Plank' );
  const Shape = require( 'KITE/Shape' );
  const Transform3 = require( 'DOT/Transform3' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  const PLANK_TO_INDICATOR_SPACING = 5;
  const LEVEL_FILL_COLOR = 'rgb( 173, 255, 47 )';
  const NON_LEVEL_FILL_COLOR = 'rgb( 230, 230, 230 )';

  function LevelIndicatorNode( modelViewTransform, plank ) {
    Node.call( this );
    const self = this;

    // Locations for left and right edge
    const leftEdgeOfPlank = modelViewTransform.modelToViewPosition( new Vector2(
      plank.pivotPoint.x - Plank.LENGTH / 2,
      plank.getPlankSurfaceCenter().y
    ) );
    const rightEdgeOfPlank = modelViewTransform.modelToViewPosition( new Vector2(
      plank.pivotPoint.x + Plank.LENGTH / 2,
      plank.getPlankSurfaceCenter().y
    ) );

    // Draw a sort of arrow head shape.
    const leftIndicatorShape = new Shape().moveTo( 0, 0 ).lineTo( -25, -10 ).lineTo( -20, 0 ).lineTo( -25, 10 ).close();

    //Create paths for left and right side
    const leftLevelIndicatorNode = new Path( leftIndicatorShape,
      {
        stroke: 'black',
        right: leftEdgeOfPlank.x - PLANK_TO_INDICATOR_SPACING,
        centerY: leftEdgeOfPlank.y
      } );
    self.addChild( leftLevelIndicatorNode );

    const reflectTransform = new Transform3( Matrix3.scaling( -1, 1 ) );
    const rightIndicatorShape = reflectTransform.transformShape( leftIndicatorShape );
    const rightLevelIndicatorNode = new Path( rightIndicatorShape,
      {
        stroke: 'black',
        left: rightEdgeOfPlank.x + PLANK_TO_INDICATOR_SPACING,
        centerY: rightEdgeOfPlank.y
      } );
    self.addChild( rightLevelIndicatorNode );

    //Highlight if the plank is level
    plank.tiltAngleProperty.link( function( tiltAngle ) {
      if ( Math.abs( tiltAngle ) < Math.PI / 1000 ) {
        leftLevelIndicatorNode.fill = LEVEL_FILL_COLOR;
        rightLevelIndicatorNode.fill = LEVEL_FILL_COLOR;
      }
      else {
        leftLevelIndicatorNode.fill = NON_LEVEL_FILL_COLOR;
        rightLevelIndicatorNode.fill = NON_LEVEL_FILL_COLOR;
      }
    } );
  }

  balancingAct.register( 'LevelIndicatorNode', LevelIndicatorNode );

  return inherit( Node, LevelIndicatorNode );
} );



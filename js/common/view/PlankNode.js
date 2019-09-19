// Copyright 2013-2019, University of Colorado Boulder

/**
 * View representation for the plank.
 *
 * @author John Blanco
 */
define( require => {
  'use strict';

  // modules
  const balancingAct = require( 'BALANCING_ACT/balancingAct' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Plank = require( 'BALANCING_ACT/common/model/Plank' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Shape = require( 'KITE/Shape' );
  const Util = require( 'DOT/Util' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  const NORMAL_TICK_MARK_LINE_WIDTH = 1;
  const BOLD_TICK_MARK_LINE_WIDTH = 3;
  const HIGHLIGHT_COLOR = 'white';
  const HIGHLIGHT_WIDTH = 12;

  /**
   * @param modelViewTransform
   * @param plank
   * @constructor
   */
  function PlankNode( modelViewTransform, plank ) {
    Node.call( this );
    const self = this;

    // Create and position the plank.
    const plankViewBounds = modelViewTransform.modelToViewShape( plank.unrotatedShape ).bounds;
    const plankNode = new Rectangle( plankViewBounds.minX, plankViewBounds.minY, plankViewBounds.width, plankViewBounds.height,
      {
        fill: 'rgb( 243, 203, 127 )',
        stroke: 'black',
        lineThickness: 1
      } );
    self.addChild( plankNode );

    // Function for mapping plank distance relative to the center point to a highlight.
    function mapLocationToHighlightIndex( distanceFromCenter ) {
      return Util.roundSymmetric(
        ( distanceFromCenter + Plank.LENGTH / 2 ) * ( ( Plank.NUM_SNAP_TO_LOCATIONS + 1 ) / Plank.LENGTH )
      ) - 1;
    }

    // Function for updating the highlights
    function updateHighlights() {
      self.highlights.forEach( function( highlight ) {
        highlight.visible = false;
      } );
      plank.activeDropLocations.forEach( function( location ) {
        self.highlights[ mapLocationToHighlightIndex( location ) ].visible = true;
      } );
    }

    // Update the tick mark highlights as the active drop locations change.
    plank.activeDropLocations.addItemAddedListener( updateHighlights );
    plank.activeDropLocations.addItemRemovedListener( updateHighlights );

    // Create and add the tick mark layer.
    const tickMarkLayer = new Node();
    const tickMarkShape = Shape.lineSegment( 0, 0, 0, modelViewTransform.modelToViewDeltaY( Plank.THICKNESS ) );
    const plankLeftEdge = new Vector2( modelViewTransform.modelToViewX( plank.getPlankSurfaceCenter().x - Plank.LENGTH / 2 ),
      modelViewTransform.modelToViewY( plank.getPlankSurfaceCenter().y ) );
    const tickMarkDeltaX = modelViewTransform.modelToViewDeltaX( Plank.INTER_SNAP_TO_MARKER_DISTANCE );
    this.highlights = [];
    for ( let i = 0; i < Plank.NUM_SNAP_TO_LOCATIONS; i++ ) {
      let tickMarkStroke = NORMAL_TICK_MARK_LINE_WIDTH;
      if ( i % 2 === 0 ) {
        // Make some marks bold for easier placement of masses.
        // The 'if' clause can be tweaked to put marks in
        // different places.
        tickMarkStroke = BOLD_TICK_MARK_LINE_WIDTH;
      }
      const tickMark = new Path( tickMarkShape,
        {
          centerX: plankLeftEdge.x + ( i + 1 ) * tickMarkDeltaX,
          top: plankLeftEdge.y,
          lineWidth: tickMarkStroke,
          stroke: 'black'
        } );
      const highlight = new Rectangle(
        tickMark.centerX - HIGHLIGHT_WIDTH / 2,
        tickMark.top,
        HIGHLIGHT_WIDTH,
        tickMark.bounds.height,
        0,
        0,
        { fill: HIGHLIGHT_COLOR, visible: false }
      );
      tickMarkLayer.addChild( highlight );
      this.highlights.push( highlight );
      tickMarkLayer.addChild( tickMark );
    }
    plankNode.addChild( tickMarkLayer );

    // Track the rotational angle of the plank and update this node accordingly.
    let nodeRotation = 0;
    const rotationPoint = modelViewTransform.modelToViewPosition( plank.pivotPoint );
    plank.tiltAngleProperty.link( function( tiltAngle ) {
      plankNode.rotateAround( rotationPoint, nodeRotation - tiltAngle );
      nodeRotation = tiltAngle;
    } );
  }

  balancingAct.register( 'PlankNode', PlankNode );

  return inherit( Node, PlankNode );
} );

// Copyright 2002-2013, University of Colorado Boulder

/**
 * View representation for the fulcrum.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // imports
  var Color = require( 'SCENERY/util/Color' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );

  function FulcrumNode( mvt, fulcrum ) {
    Node.call( this );
//    Node.call( this, mvt, fulcrum.shape, new Color( 240, 240, 0 ) );
    this.addChild( new Path( mvt.modelToViewShape( fulcrum.shape ),
      {
        fill: 'rgb( 240, 240, 0 )',
        stroke: 'black',
        lineThickness: 1
      } ) );
  }

  return inherit( Node, FulcrumNode );
} );

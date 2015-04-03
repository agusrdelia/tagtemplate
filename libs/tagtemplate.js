function Templates (){
	this.elementErrors = [];
	this.elementPath = "elements/";
	this.elementTag = "t";
	this.extension = "html";
	this.elementLoaded = [];
	var _this = this;
	
	this.init = function(  ){
		var Tag = $( _this.elementTag );
		Tag.each(function(){
			var $element = $( this );
			load( $element );
		});
		if( Tag.length > 0){
			_this.init();
		}else if( _this.elementErrors.length > 0 ){
			$.each( _this.elementErrors, function( e, text){
				console.error( text );
			});
		}	
	};
	
	var getAttributeIsSet = function( $element, attribute ){
		return $element.is( '['+attribute+']' ) ? $element.attr( attribute ) : "";
	}
	
	var getFileURL = function( $element, extension ){
		var Folder = getAttributeIsSet( $element, 'name' ),
			Filename = getAttributeIsSet( $element, 'filename' ),
			Instance = getAttributeIsSet( $element, 'instance' );
		Instance = Instance != "" ? "-"+Instance : "";
		if( extension == "css" || extension == "js"  ){
			Instance = "";
			Filename = "";
		}
		Filename = Filename != "" ? Filename : Folder + Instance + '.' + (extension || _this.extension);
		return _this.elementPath + Folder + '/' + Filename;
	}
	
	var filesLoaded = function( $element ){
		var Template = getAttributeIsSet( $element, 'name' );
		_this.elementLoaded.push( Template );
	}
	
	var elementFilesIsLoaded = function( $element ){
		var Template = getAttributeIsSet( $element, 'name' );
		return _this.elementLoaded.indexOf( Template ) == -1;
	}
	
	var loadCSS = function( $element ){
		$( '<link/>', {
			rel: 'stylesheet',
			type: 'text/css',
			href: getFileURL( $element, 'css' )
		}).appendTo( 'head' );
	}
	
	var loadJS = function( $element ){
		if( $element.is( '[script]' ) ) {
			var script = $element.attr( 'script' );
			script = script != '' ? script : getFileURL( $element, 'js' );
			$.getScript( script );
		}
	}
	
	var load = function( $element  ){
		$.ajax({
			url: getFileURL( $element ),
			async: false,
			dataType: 'html',
			success: function( HTML ){
				parse( $element, HTML );
			},
			error: function( jqXHR, textStatus, errorThrown ){
				_this.elementErrors.push("Error al cargar el elemento "+getAttributeIsSet($element, 'name')+getAttributeIsSet($element, 'instance')+'.'+_this.extension);
				$element.remove();
			}
		});
	}	
	
	var parse = function( $element, HTML ){
		if( elementFilesIsLoaded( $element ) ){
			loadCSS( $element );
			loadJS( $element );
			filesLoaded( $element );
		}
		if( $element.is( '[image]' ) ){
			HTML = parseATTRimage( $element, HTML );
		}
		if( $element.is( '[size]' ) ){
			HTML = parseATTRsize( $element, HTML );
		}
		$element.replaceWith( HTML );	
	}
	
	var parseATTRimage = function( $element, HTML){
		var imgDimenciones = $element.attr( 'image' ).split( '|' );			
		HTML = HTML.replace( 'width="#"', 'width="'+imgDimenciones[0]+'"' );
		HTML = HTML.replace( 'height="#"', 'height="'+imgDimenciones[1]+'"' );
		return HTML;
	}
	
	var parseATTRsize = function( $element, HTML){
		var size = $element.attr( 'size' ),
			oddClass = "",
			evenClass = "",
			temp = [],
			onposition=[];
		size = size != '' ? parseInt( size, 10 ) : 0;

		if( $element.is( '[odd]' ) || $element.is( '[even]' ) ){
			oddClass = getAttributeIsSet( $element, 'odd' );
			evenClass = getAttributeIsSet( $element, 'even' );
		}	
		
		$element.find( 'include' ).each(function(){
			var $this = $( this ),
				Array = [],
				Position = getAttributeIsSet( $this, 'onposition' );
			Array.push( $this.html() );	
			if( $this.is( '[after]' ) ){
				Array.push( true );
			}	
			onposition[ (parseInt( Position, 10) - 1) ] = Array;
		});
		
		for( i = 0; i < size; i++ ){
			HTML = $( HTML );
			HTML.removeClass( oddClass + " " + evenClass ).addClass( (i % 2 == 0 ? oddClass : evenClass) );
			
			var include = "",
				isAfter = false;
			if( onposition[ i ] != undefined ){
				isAfter = onposition[ i ][ 1 ] != undefined ? true : false;
				include = onposition[ i ][ 0 ];
			}
			if( isAfter ){
				include = ( $('<div>').append($(HTML).clone()).html() ) + include;
			}else{
				include = include + ( $('<div>').append($(HTML).clone()).html() );
			}
			temp[i] = include;
		}
		
		HTML = temp.join('');
		return HTML;
			
	}
	
};

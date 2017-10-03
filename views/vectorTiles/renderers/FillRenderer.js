// COPYRIGHT © 2017 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.5/esri/copyright.txt for details.

define(["require","exports","../../../core/libs/gl-matrix/mat4","../../../core/libs/gl-matrix/mat3","../../../core/libs/gl-matrix/vec4","../../../core/libs/gl-matrix/vec3","../../webgl/Program","../../webgl/VertexArrayObject","../GeometryUtils","./vtShaderSnippets"],function(t,i,r,e,o,l,n,a,s,_){var f=1/65536,u=function(){function t(){this._outlineAttributeLocations={a_pos:0,a_offset:1,a_xnormal:2},this._fillAttributeLocations={a_pos:0},this._initialized=!1,this._viewProjMat=r.create(),this._offsetVector=l.create(),this._patternMatrix=e.create(),this._color=o.create(),this._outlineColor=o.create()}return t.prototype.dispose=function(){this._solidFillProgram&&(this._solidFillProgram.dispose(),this._solidFillProgram=null),this._patternFillProgram&&(this._patternFillProgram.dispose(),this._patternFillProgram=null),this._outlineProgram&&(this._outlineProgram.dispose(),this._outlineProgram=null)},t.prototype.render=function(t,i,o,l,n,a,_,u,m,h,g){if(0!==i.triangleElementCount){this._initialized||this._initialize(t);var d=_.getPaintValue("fill-pattern",o),p=void 0!==d;if(!p||0!==n){var c=_.getPaintValue("fill-antialias",o)&&!p,P=g*_.getPaintValue("fill-opacity",o),v=_.getPaintValue("fill-color",o),y=!1;if(!p){var x=v[3]*P;1===x&&0===n&&(y=!0),1>x&&1===n&&(y=!0)}if(y||0!==n){var V=a.tileTransform.transform,b=512,A=a.coordRange/b,O=_.getPaintValue("fill-translate",o);if(0!==O[0]||0!==O[1]){r.copy(this._viewProjMat,a.tileTransform.transform);var F=O[0],M=O[1],U=0,w=0,z=(1<<a.key.level)/Math.pow(2,o)*A,S=_.getPaintValue("fill-translate-anchor",o);if(1===S){var C=Math.sin(s.C_DEG_TO_RAD*-l),T=Math.cos(s.C_DEG_TO_RAD*-l);U=z*(F*T-M*C),w=z*(F*C+M*T)}else U=z*F,w=z*M;this._offsetVector[0]=U,this._offsetVector[1]=w,this._offsetVector[2]=0,r.translate(this._viewProjMat,this._viewProjMat,this._offsetVector),V=this._viewProjMat}var j=this._getTrianglesVAO(t,a);if(j){if(p){if(1===n){var E=u.getMosaicItemPosition(d,!0);if(E){var L=512,B=a.coordRange/L,z=B/Math.pow(2,Math.round(o)-a.key.level)/h;e.identity(this._patternMatrix);var D=1/(E.size[0]*z),R=1/(E.size[1]*z);this._patternMatrix[0]=D,this._patternMatrix[4]=R,t.bindVAO(j),u.bind(t,9729,E.page,1),t.bindProgram(this._patternFillProgram),this._patternFillProgram.setUniformMatrix4fv("u_transformMatrix",V),this._patternFillProgram.setUniform2fv("u_normalized_origin",a.tileTransform.displayCoord),this._patternFillProgram.setUniform1f("u_depth",_.z),this._patternFillProgram.setUniformMatrix3fv("u_pattern_matrix",this._patternMatrix),this._patternFillProgram.setUniform1f("u_opacity",P),this._patternFillProgram.setUniform2f("u_pattern_tl",E.tl[0],E.tl[1]),this._patternFillProgram.setUniform2f("u_pattern_br",E.br[0],E.br[1]),this._patternFillProgram.setUniform1i("u_texture",1),t.drawElements(4,i.triangleElementCount,5125,12*i.triangleElementStart),t.bindVAO()}}}else if(y){var x=v[3]*P;this._color[0]=x*v[0],this._color[1]=x*v[1],this._color[2]=x*v[2],this._color[3]=x,t.bindVAO(j),t.bindProgram(this._solidFillProgram),this._solidFillProgram.setUniformMatrix4fv("u_transformMatrix",V),this._solidFillProgram.setUniform2fv("u_normalized_origin",a.tileTransform.displayCoord),this._solidFillProgram.setUniform1f("u_depth",_.z+f),this._solidFillProgram.setUniform4fv("u_color",this._color),t.drawElements(4,i.triangleElementCount,5125,12*i.triangleElementStart),t.bindVAO()}if(c&&i.outlineElementCount>0){if(1!==n)return;var G=_.getPaintValue("fill-outline-color",o);if(0===G[3]){if(1!==this._color[3])return;G=v}var I=.75/h,k=G[3]*P;this._outlineColor[0]=k*G[0],this._outlineColor[1]=k*G[1],this._outlineColor[2]=k*G[2],this._outlineColor[3]=k;var q=this._getOutlineVAO(t,a);if(!q)return;t.bindVAO(q),t.bindProgram(this._outlineProgram),this._outlineProgram.setUniformMatrix4fv("u_transformMatrix",V),this._outlineProgram.setUniformMatrix4fv("u_extrudeMatrix",m),this._outlineProgram.setUniform2fv("u_normalized_origin",a.tileTransform.displayCoord),this._outlineProgram.setUniform1f("u_depth",_.z),this._outlineProgram.setUniform1f("u_outline_width",I),this._outlineProgram.setUniform4fv("u_color",this._outlineColor),t.drawElements(4,i.outlineElementCount,5125,12*i.outlineElementStart),t.bindVAO()}}}}}},t.prototype._initialize=function(t){if(this._initialized)return!0;var i={a_pos:0},r=new n(t,_.solidFillShaderVS,_.solidFillShaderFS,i);if(!r)return!1;var e={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:4,normalized:!1,divisor:0}]},o=new n(t,_.patternFillShaderVS,_.patternFillShaderFS,this._fillAttributeLocations);if(!o)return!1;var l=new n(t,_.fillOutlineShaderVS,_.fillOutlineShaderFS,this._outlineAttributeLocations),a={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:8,normalized:!1,divisor:0},{name:"a_offset",count:2,type:5120,offset:4,stride:8,normalized:!1,divisor:0},{name:"a_xnormal",count:2,type:5120,offset:6,stride:8,normalized:!1,divisor:0}]};return this._solidFillProgram=r,this._patternFillProgram=o,this._trianglesVertexAttributes=e,this._outlineProgram=l,this._outlineVertexAttributes=a,this._initialized=!0,!0},t.prototype._getTrianglesVAO=function(t,i){if(i.polygonTrianglesVertexArrayObject)return i.polygonTrianglesVertexArrayObject;var r=i.polygonTrianglesVertexBuffer,e=i.polygonTrianglesIndexBuffer;return r&&e?(i.polygonTrianglesVertexArrayObject=new a(t,this._fillAttributeLocations,this._trianglesVertexAttributes,{geometry:r},e),i.polygonTrianglesVertexArrayObject):null},t.prototype._getOutlineVAO=function(t,i){if(i.polygonOutlineVertexArrayObject)return i.polygonOutlineVertexArrayObject;var r=i.polygonOutlinesVertexBuffer,e=i.polygonOutlinesIndexBuffer;return r&&e?(i.polygonOutlineVertexArrayObject=new a(t,this._outlineAttributeLocations,this._outlineVertexAttributes,{geometry:r},e),i.polygonOutlineVertexArrayObject):null},t}();return u});
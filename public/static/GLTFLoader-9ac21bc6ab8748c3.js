THREE.GLTFLoader=function(){function e(e){this.manager=void 0!==e?e:THREE.DefaultLoadingManager,this.dracoLoader=null,this.ddsLoader=null}function t(){var e={};return{get:function(t){return e[t]},add:function(t,r){e[t]=r},remove:function(t){delete e[t]},removeAll:function(){e={}}}}e.prototype={constructor:e,crossOrigin:"anonymous",load:function(e,t,r,a){var s,n=this;s=void 0!==this.resourcePath?this.resourcePath:void 0!==this.path?this.path:THREE.LoaderUtils.extractUrlBase(e),n.manager.itemStart(e);var i=function(t){a?a(t):console.error(t),n.manager.itemError(e),n.manager.itemEnd(e)},o=new THREE.FileLoader(n.manager);o.setPath(this.path),o.setResponseType("arraybuffer"),"use-credentials"===n.crossOrigin&&o.setWithCredentials(!0),o.load(e,(function(r){try{n.parse(r,s,(function(r){t(r),n.manager.itemEnd(e)}),i)}catch(e){i(e)}}),r,i)},setCrossOrigin:function(e){return this.crossOrigin=e,this},setPath:function(e){return this.path=e,this},setResourcePath:function(e){return this.resourcePath=e,this},setDRACOLoader:function(e){return this.dracoLoader=e,this},setDDSLoader:function(e){return this.ddsLoader=e,this},parse:function(e,t,c,d){var h,m={};if("string"==typeof e)h=e;else if(THREE.LoaderUtils.decodeText(new Uint8Array(e,0,4))===i){try{m[r.KHR_BINARY_GLTF]=new o(e)}catch(e){return void(d&&d(e))}h=m[r.KHR_BINARY_GLTF].content}else h=THREE.LoaderUtils.decodeText(new Uint8Array(e));var f=JSON.parse(h);if(void 0===f.asset||f.asset.version[0]<2)d&&d(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported. Use LegacyGLTFLoader instead."));else{if(f.extensionsUsed)for(var v=0;v<f.extensionsUsed.length;++v){var E=f.extensionsUsed[v],g=f.extensionsRequired||[];switch(E){case r.KHR_LIGHTS_PUNCTUAL:m[E]=new s(f);break;case r.KHR_MATERIALS_UNLIT:m[E]=new n;break;case r.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:m[E]=new u;break;case r.KHR_DRACO_MESH_COMPRESSION:m[E]=new l(f,this.dracoLoader);break;case r.MSFT_TEXTURE_DDS:m[r.MSFT_TEXTURE_DDS]=new a(this.ddsLoader);break;case r.KHR_TEXTURE_TRANSFORM:m[r.KHR_TEXTURE_TRANSFORM]=new p;break;default:g.indexOf(E)>=0&&console.warn('THREE.GLTFLoader: Unknown extension "'+E+'".')}}new A(f,m,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,manager:this.manager}).parse(c,d)}}};var r={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:"KHR_materials_pbrSpecularGlossiness",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",MSFT_TEXTURE_DDS:"MSFT_texture_dds"};function a(e){if(!e)throw new Error("THREE.GLTFLoader: Attempting to load .dds texture without importing THREE.DDSLoader");this.name=r.MSFT_TEXTURE_DDS,this.ddsLoader=e}function s(e){this.name=r.KHR_LIGHTS_PUNCTUAL;var t=e.extensions&&e.extensions[r.KHR_LIGHTS_PUNCTUAL]||{};this.lightDefs=t.lights||[]}function n(){this.name=r.KHR_MATERIALS_UNLIT}s.prototype.loadLight=function(e){var t,r=this.lightDefs[e],a=new THREE.Color(16777215);void 0!==r.color&&a.fromArray(r.color);var s=void 0!==r.range?r.range:0;switch(r.type){case"directional":(t=new THREE.DirectionalLight(a)).target.position.set(0,0,-1),t.add(t.target);break;case"point":(t=new THREE.PointLight(a)).distance=s;break;case"spot":(t=new THREE.SpotLight(a)).distance=s,r.spot=r.spot||{},r.spot.innerConeAngle=void 0!==r.spot.innerConeAngle?r.spot.innerConeAngle:0,r.spot.outerConeAngle=void 0!==r.spot.outerConeAngle?r.spot.outerConeAngle:Math.PI/4,t.angle=r.spot.outerConeAngle,t.penumbra=1-r.spot.innerConeAngle/r.spot.outerConeAngle,t.target.position.set(0,0,-1),t.add(t.target);break;default:throw new Error('THREE.GLTFLoader: Unexpected light type, "'+r.type+'".')}return t.position.set(0,0,0),t.decay=2,void 0!==r.intensity&&(t.intensity=r.intensity),t.name=r.name||"light_"+e,Promise.resolve(t)},n.prototype.getMaterialType=function(){return THREE.MeshBasicMaterial},n.prototype.extendParams=function(e,t,r){var a=[];e.color=new THREE.Color(1,1,1),e.opacity=1;var s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){var n=s.baseColorFactor;e.color.fromArray(n),e.opacity=n[3]}void 0!==s.baseColorTexture&&a.push(r.assignTexture(e,"map",s.baseColorTexture))}return Promise.all(a)};var i="glTF";function o(e){this.name=r.KHR_BINARY_GLTF,this.content=null,this.body=null;var t=new DataView(e,0,12);if(this.header={magic:THREE.LoaderUtils.decodeText(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==i)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected. Use LegacyGLTFLoader instead.");for(var a=new DataView(e,12),s=0;s<a.byteLength;){var n=a.getUint32(s,!0);s+=4;var o=a.getUint32(s,!0);if(s+=4,1313821514===o){var l=new Uint8Array(e,12+s,n);this.content=THREE.LoaderUtils.decodeText(l)}else if(5130562===o){var p=12+s;this.body=e.slice(p,p+n)}s+=n}if(null===this.content)throw new Error("THREE.GLTFLoader: JSON content not found.")}function l(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=r.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t}function p(){this.name=r.KHR_TEXTURE_TRANSFORM}function u(){return{name:r.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS,specularGlossinessParams:["color","map","lightMap","lightMapIntensity","aoMap","aoMapIntensity","emissive","emissiveIntensity","emissiveMap","bumpMap","bumpScale","normalMap","displacementMap","displacementScale","displacementBias","specularMap","specular","glossinessMap","glossiness","alphaMap","envMap","envMapIntensity","refractionRatio"],getMaterialType:function(){return THREE.ShaderMaterial},extendParams:function(e,t,r){var a=t.extensions[this.name],s=THREE.ShaderLib.standard,n=THREE.UniformsUtils.clone(s.uniforms),i=["#ifdef USE_SPECULARMAP","\tuniform sampler2D specularMap;","#endif"].join("\n"),o=["#ifdef USE_GLOSSINESSMAP","\tuniform sampler2D glossinessMap;","#endif"].join("\n"),l=["vec3 specularFactor = specular;","#ifdef USE_SPECULARMAP","\tvec4 texelSpecular = texture2D( specularMap, vUv );","\ttexelSpecular = sRGBToLinear( texelSpecular );","\t// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture","\tspecularFactor *= texelSpecular.rgb;","#endif"].join("\n"),p=["float glossinessFactor = glossiness;","#ifdef USE_GLOSSINESSMAP","\tvec4 texelGlossiness = texture2D( glossinessMap, vUv );","\t// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture","\tglossinessFactor *= texelGlossiness.a;","#endif"].join("\n"),u=["PhysicalMaterial material;","material.diffuseColor = diffuseColor.rgb;","material.specularRoughness = clamp( 1.0 - glossinessFactor, 0.04, 1.0 );","material.specularColor = specularFactor.rgb;"].join("\n"),c=s.fragmentShader.replace("uniform float roughness;","uniform vec3 specular;").replace("uniform float metalness;","uniform float glossiness;").replace("#include <roughnessmap_pars_fragment>",i).replace("#include <metalnessmap_pars_fragment>",o).replace("#include <roughnessmap_fragment>",l).replace("#include <metalnessmap_fragment>",p).replace("#include <lights_physical_fragment>",u);delete n.roughness,delete n.metalness,delete n.roughnessMap,delete n.metalnessMap,n.specular={value:(new THREE.Color).setHex(1118481)},n.glossiness={value:.5},n.specularMap={value:null},n.glossinessMap={value:null},e.vertexShader=s.vertexShader,e.fragmentShader=c,e.uniforms=n,e.defines={STANDARD:""},e.color=new THREE.Color(1,1,1),e.opacity=1;var d=[];if(Array.isArray(a.diffuseFactor)){var h=a.diffuseFactor;e.color.fromArray(h),e.opacity=h[3]}if(void 0!==a.diffuseTexture&&d.push(r.assignTexture(e,"map",a.diffuseTexture)),e.emissive=new THREE.Color(0,0,0),e.glossiness=void 0!==a.glossinessFactor?a.glossinessFactor:1,e.specular=new THREE.Color(1,1,1),Array.isArray(a.specularFactor)&&e.specular.fromArray(a.specularFactor),void 0!==a.specularGlossinessTexture){var m=a.specularGlossinessTexture;d.push(r.assignTexture(e,"glossinessMap",m)),d.push(r.assignTexture(e,"specularMap",m))}return Promise.all(d)},createMaterial:function(e){var t=new THREE.ShaderMaterial({defines:e.defines,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader,uniforms:e.uniforms,fog:!0,lights:!0,opacity:e.opacity,transparent:e.transparent});return t.isGLTFSpecularGlossinessMaterial=!0,t.color=e.color,t.map=void 0===e.map?null:e.map,t.lightMap=null,t.lightMapIntensity=1,t.aoMap=void 0===e.aoMap?null:e.aoMap,t.aoMapIntensity=1,t.emissive=e.emissive,t.emissiveIntensity=1,t.emissiveMap=void 0===e.emissiveMap?null:e.emissiveMap,t.bumpMap=void 0===e.bumpMap?null:e.bumpMap,t.bumpScale=1,t.normalMap=void 0===e.normalMap?null:e.normalMap,e.normalScale&&(t.normalScale=e.normalScale),t.displacementMap=null,t.displacementScale=1,t.displacementBias=0,t.specularMap=void 0===e.specularMap?null:e.specularMap,t.specular=e.specular,t.glossinessMap=void 0===e.glossinessMap?null:e.glossinessMap,t.glossiness=e.glossiness,t.alphaMap=null,t.envMap=void 0===e.envMap?null:e.envMap,t.envMapIntensity=1,t.refractionRatio=.98,t.extensions.derivatives=!0,t},cloneMaterial:function(e){var t=e.clone();t.isGLTFSpecularGlossinessMaterial=!0;for(var r=this.specularGlossinessParams,a=0,s=r.length;a<s;a++){var n=e[r[a]];t[r[a]]=n&&n.isColor?n.clone():n}return t},refreshUniforms:function(e,t,r,a,s){if(!0===s.isGLTFSpecularGlossinessMaterial){var n,i=s.uniforms,o=s.defines;i.opacity.value=s.opacity,i.diffuse.value.copy(s.color),i.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),i.map.value=s.map,i.specularMap.value=s.specularMap,i.alphaMap.value=s.alphaMap,i.lightMap.value=s.lightMap,i.lightMapIntensity.value=s.lightMapIntensity,i.aoMap.value=s.aoMap,i.aoMapIntensity.value=s.aoMapIntensity,s.map?n=s.map:s.specularMap?n=s.specularMap:s.displacementMap?n=s.displacementMap:s.normalMap?n=s.normalMap:s.bumpMap?n=s.bumpMap:s.glossinessMap?n=s.glossinessMap:s.alphaMap?n=s.alphaMap:s.emissiveMap&&(n=s.emissiveMap),void 0!==n&&(n.isWebGLRenderTarget&&(n=n.texture),!0===n.matrixAutoUpdate&&n.updateMatrix(),i.uvTransform.value.copy(n.matrix)),s.envMap&&(i.envMap.value=s.envMap,i.envMapIntensity.value=s.envMapIntensity,i.flipEnvMap.value=s.envMap.isCubeTexture?-1:1,i.reflectivity.value=s.reflectivity,i.refractionRatio.value=s.refractionRatio,i.maxMipLevel.value=e.properties.get(s.envMap).__maxMipLevel),i.specular.value.copy(s.specular),i.glossiness.value=s.glossiness,i.glossinessMap.value=s.glossinessMap,i.emissiveMap.value=s.emissiveMap,i.bumpMap.value=s.bumpMap,i.normalMap.value=s.normalMap,i.displacementMap.value=s.displacementMap,i.displacementScale.value=s.displacementScale,i.displacementBias.value=s.displacementBias,null!==i.glossinessMap.value&&void 0===o.USE_GLOSSINESSMAP&&(o.USE_GLOSSINESSMAP="",o.USE_ROUGHNESSMAP=""),null===i.glossinessMap.value&&void 0!==o.USE_GLOSSINESSMAP&&(delete o.USE_GLOSSINESSMAP,delete o.USE_ROUGHNESSMAP)}}}}function c(e,t,r,a){THREE.Interpolant.call(this,e,t,r,a)}l.prototype.decodePrimitive=function(e,t){var r=this.json,a=this.dracoLoader,s=e.extensions[this.name].bufferView,n=e.extensions[this.name].attributes,i={},o={},l={};for(var p in n){var u=E[p]||p.toLowerCase();i[u]=n[p]}for(p in e.attributes)if(u=E[p]||p.toLowerCase(),void 0!==n[p]){var c=r.accessors[e.attributes[p]],d=h[c.componentType];l[u]=d,o[u]=!0===c.normalized}return t.getDependency("bufferView",s).then((function(e){return new Promise((function(t){a.decodeDracoFile(e,(function(e){for(var r in e.attributes){var a=e.attributes[r],s=o[r];void 0!==s&&(a.normalized=s)}t(e)}),i,l)}))}))},p.prototype.extendTexture=function(e,t){return e=e.clone(),void 0!==t.offset&&e.offset.fromArray(t.offset),void 0!==t.rotation&&(e.rotation=t.rotation),void 0!==t.scale&&e.repeat.fromArray(t.scale),void 0!==t.texCoord&&console.warn('THREE.GLTFLoader: Custom UV sets in "'+this.name+'" extension not yet supported.'),e.needsUpdate=!0,e},c.prototype=Object.create(THREE.Interpolant.prototype),c.prototype.constructor=c,c.prototype.copySampleValue_=function(e){for(var t=this.resultBuffer,r=this.sampleValues,a=this.valueSize,s=e*a*3+a,n=0;n!==a;n++)t[n]=r[s+n];return t},c.prototype.beforeStart_=c.prototype.copySampleValue_,c.prototype.afterEnd_=c.prototype.copySampleValue_,c.prototype.interpolate_=function(e,t,r,a){for(var s=this.resultBuffer,n=this.sampleValues,i=this.valueSize,o=2*i,l=3*i,p=a-t,u=(r-t)/p,c=u*u,d=c*u,h=e*l,m=h-l,f=-2*d+3*c,v=d-c,E=1-f,g=v-c+u,T=0;T!==i;T++){var R=n[m+T+i],M=n[m+T+o]*p,S=n[h+T+i],y=n[h+T]*p;s[T]=E*R+g*M+f*S+v*y}return s};var d,h={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},m={9728:THREE.NearestFilter,9729:THREE.LinearFilter,9984:THREE.NearestMipmapNearestFilter,9985:THREE.LinearMipmapNearestFilter,9986:THREE.NearestMipmapLinearFilter,9987:THREE.LinearMipmapLinearFilter},f={33071:THREE.ClampToEdgeWrapping,33648:THREE.MirroredRepeatWrapping,10497:THREE.RepeatWrapping},v={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},E={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv2",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},g={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},T={CUBICSPLINE:void 0,LINEAR:THREE.InterpolateLinear,STEP:THREE.InterpolateDiscrete},R={"image/png":THREE.RGBAFormat,"image/jpeg":THREE.RGBFormat};function M(e,t){return"string"!=typeof e||""===e?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}function S(e,t,r){for(var a in r.extensions)void 0===e[a]&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[a]=r.extensions[a])}function y(e,t){void 0!==t.extras&&("object"==typeof t.extras?Object.assign(e.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function L(e,t){if(e.updateMorphTargets(),void 0!==t.weights)for(var r=0,a=t.weights.length;r<a;r++)e.morphTargetInfluences[r]=t.weights[r];if(t.extras&&Array.isArray(t.extras.targetNames)){var s=t.extras.targetNames;if(e.morphTargetInfluences.length===s.length)for(e.morphTargetDictionary={},r=0,a=s.length;r<a;r++)e.morphTargetDictionary[s[r]]=r;else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function H(e){for(var t="",r=Object.keys(e).sort(),a=0,s=r.length;a<s;a++)t+=r[a]+":"+e[r[a]]+";";return t}function _(e){if(e.isInterleavedBufferAttribute){for(var t=e.count,r=e.itemSize,a=e.array.slice(0,t*r),s=0,n=0;s<t;++s)a[n++]=e.getX(s),r>=2&&(a[n++]=e.getY(s)),r>=3&&(a[n++]=e.getZ(s)),r>=4&&(a[n++]=e.getW(s));return new THREE.BufferAttribute(a,r,e.normalized)}return e.clone()}function A(e,r,a){this.json=e||{},this.extensions=r||{},this.options=a||{},this.cache=new t,this.primitiveCache={},this.textureLoader=new THREE.TextureLoader(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.fileLoader=new THREE.FileLoader(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),"use-credentials"===this.options.crossOrigin&&this.fileLoader.setWithCredentials(!0)}function w(e,t,r){var a=t.attributes,s=[];function n(t,a){return r.getDependency("accessor",t).then((function(t){e.addAttribute(a,t)}))}for(var i in a){var o=E[i]||i.toLowerCase();o in e.attributes||s.push(n(a[i],o))}if(void 0!==t.indices&&!e.index){var l=r.getDependency("accessor",t.indices).then((function(t){e.setIndex(t)}));s.push(l)}return y(e,t),Promise.all(s).then((function(){return void 0!==t.targets?function(e,t,r){for(var a=!1,s=!1,n=0,i=t.length;n<i&&(void 0!==(p=t[n]).POSITION&&(a=!0),void 0!==p.NORMAL&&(s=!0),!a||!s);n++);if(!a&&!s)return Promise.resolve(e);var o=[],l=[];for(n=0,i=t.length;n<i;n++){var p=t[n];if(a){var u=void 0!==p.POSITION?r.getDependency("accessor",p.POSITION):e.attributes.position;o.push(u)}s&&(u=void 0!==p.NORMAL?r.getDependency("accessor",p.NORMAL):e.attributes.normal,l.push(u))}return Promise.all([Promise.all(o),Promise.all(l)]).then((function(r){for(var n=r[0],i=r[1],o=0,l=n.length;o<l;o++)e.attributes.position!==n[o]&&(n[o]=_(n[o]));for(o=0,l=i.length;o<l;o++)e.attributes.normal!==i[o]&&(i[o]=_(i[o]));for(o=0,l=t.length;o<l;o++){var p=t[o],u="morphTarget"+o;if(a&&void 0!==p.POSITION){var c=n[o];c.name=u;for(var d=e.attributes.position,h=0,m=c.count;h<m;h++)c.setXYZ(h,c.getX(h)+d.getX(h),c.getY(h)+d.getY(h),c.getZ(h)+d.getZ(h))}if(s&&void 0!==p.NORMAL){var f=i[o];f.name=u;var v=e.attributes.normal;for(h=0,m=f.count;h<m;h++)f.setXYZ(h,f.getX(h)+v.getX(h),f.getY(h)+v.getY(h),f.getZ(h)+v.getZ(h))}}return a&&(e.morphAttributes.position=n),s&&(e.morphAttributes.normal=i),e}))}(e,t.targets,r):e}))}return A.prototype.parse=function(e,t){var r=this,a=this.json,s=this.extensions;this.cache.removeAll(),this.markDefs(),Promise.all([this.getDependencies("scene"),this.getDependencies("animation"),this.getDependencies("camera")]).then((function(t){var n={scene:t[0][a.scene||0],scenes:t[0],animations:t[1],cameras:t[2],asset:a.asset,parser:r,userData:{}};S(s,n,a),y(n,a),e(n)})).catch(t)},A.prototype.markDefs=function(){for(var e=this.json.nodes||[],t=this.json.skins||[],r=this.json.meshes||[],a={},s={},n=0,i=t.length;n<i;n++)for(var o=t[n].joints,l=0,p=o.length;l<p;l++)e[o[l]].isBone=!0;for(var u=0,c=e.length;u<c;u++){var d=e[u];void 0!==d.mesh&&(void 0===a[d.mesh]&&(a[d.mesh]=s[d.mesh]=0),a[d.mesh]++,void 0!==d.skin&&(r[d.mesh].isSkinnedMesh=!0))}this.json.meshReferences=a,this.json.meshUses=s},A.prototype.getDependency=function(e,t){var a=e+":"+t,s=this.cache.get(a);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this.loadNode(t);break;case"mesh":s=this.loadMesh(t);break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this.loadBufferView(t);break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this.loadMaterial(t);break;case"texture":s=this.loadTexture(t);break;case"skin":s=this.loadSkin(t);break;case"animation":s=this.loadAnimation(t);break;case"camera":s=this.loadCamera(t);break;case"light":s=this.extensions[r.KHR_LIGHTS_PUNCTUAL].loadLight(t);break;default:throw new Error("Unknown type: "+e)}this.cache.add(a,s)}return s},A.prototype.getDependencies=function(e){var t=this.cache.get(e);if(!t){var r=this,a=this.json[e+("mesh"===e?"es":"s")]||[];t=Promise.all(a.map((function(t,a){return r.getDependency(e,a)}))),this.cache.add(e,t)}return t},A.prototype.loadBuffer=function(e){var t=this.json.buffers[e],a=this.fileLoader;if(t.type&&"arraybuffer"!==t.type)throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(void 0===t.uri&&0===e)return Promise.resolve(this.extensions[r.KHR_BINARY_GLTF].body);var s=this.options;return new Promise((function(e,r){a.load(M(t.uri,s.path),e,void 0,(function(){r(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))}))}))},A.prototype.loadBufferView=function(e){var t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then((function(e){var r=t.byteLength||0,a=t.byteOffset||0;return e.slice(a,a+r)}))},A.prototype.loadAccessor=function(e){var t=this,r=this.json,a=this.json.accessors[e];if(void 0===a.bufferView&&void 0===a.sparse)return Promise.resolve(null);var s=[];return void 0!==a.bufferView?s.push(this.getDependency("bufferView",a.bufferView)):s.push(null),void 0!==a.sparse&&(s.push(this.getDependency("bufferView",a.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",a.sparse.values.bufferView))),Promise.all(s).then((function(e){var s,n,i=e[0],o=v[a.type],l=h[a.componentType],p=l.BYTES_PER_ELEMENT,u=p*o,c=a.byteOffset||0,d=void 0!==a.bufferView?r.bufferViews[a.bufferView].byteStride:void 0,m=!0===a.normalized;if(d&&d!==u){var f=Math.floor(c/d),E="InterleavedBuffer:"+a.bufferView+":"+a.componentType+":"+f+":"+a.count,g=t.cache.get(E);g||(s=new l(i,f*d,a.count*d/p),g=new THREE.InterleavedBuffer(s,d/p),t.cache.add(E,g)),n=new THREE.InterleavedBufferAttribute(g,o,c%d/p,m)}else s=null===i?new l(a.count*o):new l(i,c,a.count*o),n=new THREE.BufferAttribute(s,o,m);if(void 0!==a.sparse){var T=v.SCALAR,R=h[a.sparse.indices.componentType],M=a.sparse.indices.byteOffset||0,S=a.sparse.values.byteOffset||0,y=new R(e[1],M,a.sparse.count*T),L=new l(e[2],S,a.sparse.count*o);null!==i&&n.setArray(n.array.slice());for(var H=0,_=y.length;H<_;H++){var A=y[H];if(n.setX(A,L[H*o]),o>=2&&n.setY(A,L[H*o+1]),o>=3&&n.setZ(A,L[H*o+2]),o>=4&&n.setW(A,L[H*o+3]),o>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return n}))},A.prototype.loadTexture=function(e){var t,a=this,s=this.json,n=this.options,i=this.textureLoader,o=window.URL||window.webkitURL,l=s.textures[e],p=l.extensions||{},u=(t=p[r.MSFT_TEXTURE_DDS]?s.images[p[r.MSFT_TEXTURE_DDS].source]:s.images[l.source]).uri,c=!1;return void 0!==t.bufferView&&(u=a.getDependency("bufferView",t.bufferView).then((function(e){c=!0;var r=new Blob([e],{type:t.mimeType});return u=o.createObjectURL(r)}))),Promise.resolve(u).then((function(e){var t=THREE.Loader.Handlers.get(e);return t||(t=p[r.MSFT_TEXTURE_DDS]?a.extensions[r.MSFT_TEXTURE_DDS].ddsLoader:i),new Promise((function(r,a){t.load(M(e,n.path),r,void 0,a)}))})).then((function(e){!0===c&&o.revokeObjectURL(u),e.flipY=!1,void 0!==l.name&&(e.name=l.name),t.mimeType in R&&(e.format=R[t.mimeType]);var r=(s.samplers||{})[l.sampler]||{};return e.magFilter=m[r.magFilter]||THREE.LinearFilter,e.minFilter=m[r.minFilter]||THREE.LinearMipmapLinearFilter,e.wrapS=f[r.wrapS]||THREE.RepeatWrapping,e.wrapT=f[r.wrapT]||THREE.RepeatWrapping,e}))},A.prototype.assignTexture=function(e,t,a){var s=this;return this.getDependency("texture",a.index).then((function(n){if(!n.isCompressedTexture)switch(t){case"aoMap":case"emissiveMap":case"metalnessMap":case"normalMap":case"roughnessMap":n.format=THREE.RGBFormat}if(s.extensions[r.KHR_TEXTURE_TRANSFORM]){var i=void 0!==a.extensions?a.extensions[r.KHR_TEXTURE_TRANSFORM]:void 0;i&&(n=s.extensions[r.KHR_TEXTURE_TRANSFORM].extendTexture(n,i))}e[t]=n}))},A.prototype.assignFinalMaterial=function(e){var t=e.geometry,a=e.material,s=this.extensions,n=void 0!==t.attributes.tangent,i=void 0!==t.attributes.color,o=void 0===t.attributes.normal,l=!0===e.isSkinnedMesh,p=Object.keys(t.morphAttributes).length>0,u=p&&void 0!==t.morphAttributes.normal;if(e.isPoints){var c="PointsMaterial:"+a.uuid,d=this.cache.get(c);d||(d=new THREE.PointsMaterial,THREE.Material.prototype.copy.call(d,a),d.color.copy(a.color),d.map=a.map,d.lights=!1,d.sizeAttenuation=!1,this.cache.add(c,d)),a=d}else if(e.isLine){c="LineBasicMaterial:"+a.uuid;var h=this.cache.get(c);h||(h=new THREE.LineBasicMaterial,THREE.Material.prototype.copy.call(h,a),h.color.copy(a.color),h.lights=!1,this.cache.add(c,h)),a=h}if(n||i||o||l||p){c="ClonedMaterial:"+a.uuid+":",a.isGLTFSpecularGlossinessMaterial&&(c+="specular-glossiness:"),l&&(c+="skinning:"),n&&(c+="vertex-tangents:"),i&&(c+="vertex-colors:"),o&&(c+="flat-shading:"),p&&(c+="morph-targets:"),u&&(c+="morph-normals:");var m=this.cache.get(c);m||(m=a.isGLTFSpecularGlossinessMaterial?s[r.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].cloneMaterial(a):a.clone(),l&&(m.skinning=!0),n&&(m.vertexTangents=!0),i&&(m.vertexColors=THREE.VertexColors),o&&(m.flatShading=!0),p&&(m.morphTargets=!0),u&&(m.morphNormals=!0),this.cache.add(c,m)),a=m}a.aoMap&&void 0===t.attributes.uv2&&void 0!==t.attributes.uv&&t.addAttribute("uv2",new THREE.BufferAttribute(t.attributes.uv.array,2)),a.isGLTFSpecularGlossinessMaterial&&(e.onBeforeRender=s[r.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].refreshUniforms),e.material=a},A.prototype.loadMaterial=function(e){var t,a=this.json,s=this.extensions,n=a.materials[e],i={},o=n.extensions||{},l=[];if(o[r.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]){var p=s[r.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];t=p.getMaterialType(),l.push(p.extendParams(i,n,this))}else if(o[r.KHR_MATERIALS_UNLIT]){var u=s[r.KHR_MATERIALS_UNLIT];t=u.getMaterialType(),l.push(u.extendParams(i,n,this))}else{t=THREE.MeshStandardMaterial;var c=n.pbrMetallicRoughness||{};if(i.color=new THREE.Color(1,1,1),i.opacity=1,Array.isArray(c.baseColorFactor)){var d=c.baseColorFactor;i.color.fromArray(d),i.opacity=d[3]}void 0!==c.baseColorTexture&&l.push(this.assignTexture(i,"map",c.baseColorTexture)),i.metalness=void 0!==c.metallicFactor?c.metallicFactor:1,i.roughness=void 0!==c.roughnessFactor?c.roughnessFactor:1,void 0!==c.metallicRoughnessTexture&&(l.push(this.assignTexture(i,"metalnessMap",c.metallicRoughnessTexture)),l.push(this.assignTexture(i,"roughnessMap",c.metallicRoughnessTexture)))}!0===n.doubleSided&&(i.side=THREE.DoubleSide);var h=n.alphaMode||"OPAQUE";return"BLEND"===h?i.transparent=!0:(i.transparent=!1,"MASK"===h&&(i.alphaTest=void 0!==n.alphaCutoff?n.alphaCutoff:.5)),void 0!==n.normalTexture&&t!==THREE.MeshBasicMaterial&&(l.push(this.assignTexture(i,"normalMap",n.normalTexture)),i.normalScale=new THREE.Vector2(1,1),void 0!==n.normalTexture.scale&&i.normalScale.set(n.normalTexture.scale,n.normalTexture.scale)),void 0!==n.occlusionTexture&&t!==THREE.MeshBasicMaterial&&(l.push(this.assignTexture(i,"aoMap",n.occlusionTexture)),void 0!==n.occlusionTexture.strength&&(i.aoMapIntensity=n.occlusionTexture.strength)),void 0!==n.emissiveFactor&&t!==THREE.MeshBasicMaterial&&(i.emissive=(new THREE.Color).fromArray(n.emissiveFactor)),void 0!==n.emissiveTexture&&t!==THREE.MeshBasicMaterial&&l.push(this.assignTexture(i,"emissiveMap",n.emissiveTexture)),Promise.all(l).then((function(){var e;return e=t===THREE.ShaderMaterial?s[r.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(i):new t(i),void 0!==n.name&&(e.name=n.name),e.map&&(e.map.encoding=THREE.sRGBEncoding),e.emissiveMap&&(e.emissiveMap.encoding=THREE.sRGBEncoding),e.specularMap&&(e.specularMap.encoding=THREE.sRGBEncoding),y(e,n),n.extensions&&S(s,e,n),e}))},A.prototype.loadGeometries=function(e){var t=this,a=this.extensions,s=this.primitiveCache;function n(e){return a[r.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e,t).then((function(r){return w(r,e,t)}))}for(var i,o,l=[],p=0,u=e.length;p<u;p++){var c,d=e[p],h=(o=(i=d).extensions&&i.extensions[r.KHR_DRACO_MESH_COMPRESSION])?"draco:"+o.bufferView+":"+o.indices+":"+H(o.attributes):i.indices+":"+H(i.attributes)+":"+i.mode,m=s[h];m?l.push(m.promise):(c=d.extensions&&d.extensions[r.KHR_DRACO_MESH_COMPRESSION]?n(d):w(new THREE.BufferGeometry,d,t),s[h]={primitive:d,promise:c},l.push(c))}return Promise.all(l)},A.prototype.loadMesh=function(e){for(var t=this,r=this.json.meshes[e],a=r.primitives,s=[],n=0,i=a.length;n<i;n++){var o=void 0===a[n].material?d=d||new THREE.MeshStandardMaterial({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:THREE.FrontSide}):this.getDependency("material",a[n].material);s.push(o)}return Promise.all(s).then((function(s){return t.loadGeometries(a).then((function(n){for(var i=[],o=0,l=n.length;o<l;o++){var p,u=n[o],c=a[o],d=s[o];if(4===c.mode||5===c.mode||6===c.mode||void 0===c.mode)!0!==(p=!0===r.isSkinnedMesh?new THREE.SkinnedMesh(u,d):new THREE.Mesh(u,d)).isSkinnedMesh||p.geometry.attributes.skinWeight.normalized||p.normalizeSkinWeights(),5===c.mode?p.drawMode=THREE.TriangleStripDrawMode:6===c.mode&&(p.drawMode=THREE.TriangleFanDrawMode);else if(1===c.mode)p=new THREE.LineSegments(u,d);else if(3===c.mode)p=new THREE.Line(u,d);else if(2===c.mode)p=new THREE.LineLoop(u,d);else{if(0!==c.mode)throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+c.mode);p=new THREE.Points(u,d)}Object.keys(p.geometry.morphAttributes).length>0&&L(p,r),p.name=r.name||"mesh_"+e,n.length>1&&(p.name+="_"+o),y(p,r),t.assignFinalMaterial(p),i.push(p)}if(1===i.length)return i[0];var h=new THREE.Group;for(o=0,l=i.length;o<l;o++)h.add(i[o]);return h}))}))},A.prototype.loadCamera=function(e){var t,r=this.json.cameras[e],a=r[r.type];if(a)return"perspective"===r.type?t=new THREE.PerspectiveCamera(THREE.Math.radToDeg(a.yfov),a.aspectRatio||1,a.znear||1,a.zfar||2e6):"orthographic"===r.type&&(t=new THREE.OrthographicCamera(a.xmag/-2,a.xmag/2,a.ymag/2,a.ymag/-2,a.znear,a.zfar)),void 0!==r.name&&(t.name=r.name),y(t,r),Promise.resolve(t);console.warn("THREE.GLTFLoader: Missing camera parameters.")},A.prototype.loadSkin=function(e){var t=this.json.skins[e],r={joints:t.joints};return void 0===t.inverseBindMatrices?Promise.resolve(r):this.getDependency("accessor",t.inverseBindMatrices).then((function(e){return r.inverseBindMatrices=e,r}))},A.prototype.loadAnimation=function(e){for(var t=this.json.animations[e],r=[],a=[],s=[],n=[],i=[],o=0,l=t.channels.length;o<l;o++){var p=t.channels[o],u=t.samplers[p.sampler],d=p.target,h=void 0!==d.node?d.node:d.id,m=void 0!==t.parameters?t.parameters[u.input]:u.input,f=void 0!==t.parameters?t.parameters[u.output]:u.output;r.push(this.getDependency("node",h)),a.push(this.getDependency("accessor",m)),s.push(this.getDependency("accessor",f)),n.push(u),i.push(d)}return Promise.all([Promise.all(r),Promise.all(a),Promise.all(s),Promise.all(n),Promise.all(i)]).then((function(r){for(var a=r[0],s=r[1],n=r[2],i=r[3],o=r[4],l=[],p=0,u=a.length;p<u;p++){var d=a[p],h=s[p],m=n[p],f=i[p],v=o[p];if(void 0!==d){var E;switch(d.updateMatrix(),d.matrixAutoUpdate=!0,g[v.path]){case g.weights:E=THREE.NumberKeyframeTrack;break;case g.rotation:E=THREE.QuaternionKeyframeTrack;break;case g.position:case g.scale:default:E=THREE.VectorKeyframeTrack}var R=d.name?d.name:d.uuid,M=void 0!==f.interpolation?T[f.interpolation]:THREE.InterpolateLinear,S=[];g[v.path]===g.weights?d.traverse((function(e){!0===e.isMesh&&e.morphTargetInfluences&&S.push(e.name?e.name:e.uuid)})):S.push(R);var y=m.array;if(m.normalized){var L;if(y.constructor===Int8Array)L=1/127;else if(y.constructor===Uint8Array)L=1/255;else if(y.constructor==Int16Array)L=1/32767;else{if(y.constructor!==Uint16Array)throw new Error("THREE.GLTFLoader: Unsupported output accessor component type.");L=1/65535}for(var H=new Float32Array(y.length),_=0,A=y.length;_<A;_++)H[_]=y[_]*L;y=H}for(_=0,A=S.length;_<A;_++){var w=new E(S[_]+"."+g[v.path],h.array,y,M);"CUBICSPLINE"===f.interpolation&&(w.createInterpolant=function(e){return new c(this.times,this.values,this.getValueSize()/3,e)},w.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0),l.push(w)}}}var x=void 0!==t.name?t.name:"animation_"+e;return new THREE.AnimationClip(x,void 0,l)}))},A.prototype.loadNode=function(e){var t,a=this.json,s=this.extensions,n=a.meshReferences,i=a.meshUses,o=a.nodes[e];return(t=[],void 0!==o.mesh&&t.push(this.getDependency("mesh",o.mesh).then((function(e){var t;if(n[o.mesh]>1){var r=i[o.mesh]++;(t=e.clone()).name+="_instance_"+r,t.onBeforeRender=e.onBeforeRender;for(var a=0,s=t.children.length;a<s;a++)t.children[a].name+="_instance_"+r,t.children[a].onBeforeRender=e.children[a].onBeforeRender}else t=e;return void 0!==o.weights&&t.traverse((function(e){if(e.isMesh)for(var t=0,r=o.weights.length;t<r;t++)e.morphTargetInfluences[t]=o.weights[t]})),t}))),void 0!==o.camera&&t.push(this.getDependency("camera",o.camera)),o.extensions&&o.extensions[r.KHR_LIGHTS_PUNCTUAL]&&void 0!==o.extensions[r.KHR_LIGHTS_PUNCTUAL].light&&t.push(this.getDependency("light",o.extensions[r.KHR_LIGHTS_PUNCTUAL].light)),Promise.all(t)).then((function(e){var t;if((t=!0===o.isBone?new THREE.Bone:e.length>1?new THREE.Group:1===e.length?e[0]:new THREE.Object3D)!==e[0])for(var r=0,a=e.length;r<a;r++)t.add(e[r]);if(void 0!==o.name&&(t.userData.name=o.name,t.name=THREE.PropertyBinding.sanitizeNodeName(o.name)),y(t,o),o.extensions&&S(s,t,o),void 0!==o.matrix){var n=new THREE.Matrix4;n.fromArray(o.matrix),t.applyMatrix(n)}else void 0!==o.translation&&t.position.fromArray(o.translation),void 0!==o.rotation&&t.quaternion.fromArray(o.rotation),void 0!==o.scale&&t.scale.fromArray(o.scale);return t}))},A.prototype.loadScene=function(){function e(t,r,a,s){var n=a.nodes[t];return s.getDependency("node",t).then((function(e){return void 0===n.skin?e:s.getDependency("skin",n.skin).then((function(e){for(var r=[],a=0,n=(t=e).joints.length;a<n;a++)r.push(s.getDependency("node",t.joints[a]));return Promise.all(r)})).then((function(r){return e.traverse((function(e){if(e.isMesh){for(var a=[],s=[],n=0,i=r.length;n<i;n++){var o=r[n];if(o){a.push(o);var l=new THREE.Matrix4;void 0!==t.inverseBindMatrices&&l.fromArray(t.inverseBindMatrices.array,16*n),s.push(l)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[n])}e.bind(new THREE.Skeleton(a,s),e.matrixWorld)}})),e}));var t})).then((function(t){r.add(t);var i=[];if(n.children)for(var o=n.children,l=0,p=o.length;l<p;l++){var u=o[l];i.push(e(u,t,a,s))}return Promise.all(i)}))}return function(t){var r=this.json,a=this.extensions,s=this.json.scenes[t],n=new THREE.Scene;void 0!==s.name&&(n.name=s.name),y(n,s),s.extensions&&S(a,n,s);for(var i=s.nodes||[],o=[],l=0,p=i.length;l<p;l++)o.push(e(i[l],n,r,this));return Promise.all(o).then((function(){return n}))}}(),e}();
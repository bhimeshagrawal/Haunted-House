import './style/main.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DirectionalLight } from 'three'

/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight
window.addEventListener('resize', () => {
    // Save sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
})
window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen()
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen()
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    }
})

/**
 * GUI
 **/
const gui = new dat.GUI()




/**
 * Environnements
 */
// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(2.5, 2, 6)
scene.add(camera)

// textures 
const textureLoader = new THREE.TextureLoader()
//door
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
// floor
const floorColorTexture = textureLoader.load("/textures/Grass_005/color.jpg")
const floorAmbientOcclusionTexture = textureLoader.load("/textures/Grass_005/ambientOcclusion.jpg")
const floorRoughnessTexture = textureLoader.load("/textures/Grass_005/roughness.jpg")
const floorNormalTexture = textureLoader.load("/textures/Grass_005/normal.jpg")
const floorHeightTexture = textureLoader.load("/textures/Grass_005/height.png")
floorColorTexture.repeat.set(5, 5)
floorColorTexture.wrapS = THREE.RepeatWrapping
floorColorTexture.wrapT = THREE.RepeatWrapping
floorAmbientOcclusionTexture.repeat.set(5, 5)
floorAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
floorAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
floorRoughnessTexture.repeat.set(5, 5)
floorRoughnessTexture.wrapS = THREE.RepeatWrapping
floorRoughnessTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.repeat.set(5, 5)
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorHeightTexture.repeat.set(5, 5)
floorHeightTexture.wrapS = THREE.RepeatWrapping
floorHeightTexture.wrapT = THREE.RepeatWrapping
// bricks
const bricksColorTexture = textureLoader.load("/textures/Brick_Wall_017/color.jpg")
const bricksAmbientOcclusionTexture = textureLoader.load("/textures/Brick_Wall_017/ambientOcclusion.jpg")
const bricksRoughnessTexture = textureLoader.load("/textures/Brick_Wall_017/roughness.jpg")
const bricksNormalTexture = textureLoader.load("/textures/Brick_Wall_017/normal.jpg")
const bricksHeightTexture = textureLoader.load("/textures/Brick_Wall_017/height.png")
bricksColorTexture.repeat.set(3, 3)
bricksColorTexture.wrapS = THREE.RepeatWrapping
bricksColorTexture.wrapT = THREE.RepeatWrapping
bricksAmbientOcclusionTexture.repeat.set(3, 3)
bricksAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
bricksAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
bricksRoughnessTexture.repeat.set(3, 3)
bricksRoughnessTexture.wrapS = THREE.RepeatWrapping
bricksRoughnessTexture.wrapT = THREE.RepeatWrapping
bricksNormalTexture.repeat.set(3, 3)
bricksNormalTexture.wrapS = THREE.RepeatWrapping
bricksNormalTexture.wrapT = THREE.RepeatWrapping
bricksHeightTexture.repeat.set(3, 3)
bricksHeightTexture.wrapS = THREE.RepeatWrapping
bricksHeightTexture.wrapT = THREE.RepeatWrapping
// roof
const roofColorTexture = textureLoader.load("/textures/Roof_Tiles_Terracotta_005/color.jpg")
const roofAmbientOcclusionTexture = textureLoader.load("/textures/Roof_Tiles_Terracotta_005/ambientOcclusion.jpg")
const roofRoughnessTexture = textureLoader.load("/textures/Roof_Tiles_Terracotta_005/roughness.jpg")
const roofNormalTexture = textureLoader.load("/textures/Roof_Tiles_Terracotta_005/normal.jpg")
const roofHeightTexture = textureLoader.load("/textures/Roof_Tiles_Terracotta_005/height.png")





// Objects
const house = new THREE.Group()
scene.add(house)

const walls = new THREE.Mesh(
    new THREE.BoxBufferGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        roughnessMap: bricksRoughnessTexture,
        normalMap: bricksNormalTexture,
        displacementMap: bricksHeightTexture,
        displacementScale: 0.1
    })
)
walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2))
walls.position.y = 2.5 * 0.5
house.add(walls)

const roof = new THREE.Mesh(
    new THREE.ConeBufferGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        aoMap: roofAmbientOcclusionTexture,
        roughnessMap: roofRoughnessTexture,
        normalMap: roofNormalTexture,
        displacementMap: roofHeightTexture,
        displacementScale: 0.1
    })
)
roof.position.y = 2.5 + 0.5
roof.rotation.y = Math.PI * 0.25
house.add(roof)

const door = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2, 2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        metalnessMap: doorMetalnessTexture,
        normalMap: doorNormalTexture,
        roughnessMap: doorRoughnessTexture
    })
)
door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2))
door.position.y = 1
door.position.z = 2 + 0.01
house.add(door)

const bushGeometry = new THREE.SphereBufferGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })
const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)
const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)
const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 2.2)
const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 2.6)
house.add(bush1, bush2, bush3, bush4)

const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' })
for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 6
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.set(x, 0.4, z)
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    graves.add(grave)
}

const fog = new THREE.Fog('#262837', 1, 10)
scene.fog = fog


const floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(40, 40), new THREE.MeshStandardMaterial({
    map: floorColorTexture,
    aoMap: floorAmbientOcclusionTexture,
    roughnessMap: floorRoughnessTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorHeightTexture,
    displacementScale: 0.01
}))
floor.material.side = THREE.DoubleSide
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)


// Lights

const moonlight = new DirectionalLight(0xb9d5ff, 0.3)
moonlight.position.set(4, 10, -2)
scene.add(moonlight)

const doorLight = new THREE.PointLight(0xff7d46, 1.5, 7)
doorLight.position.set(0, 2.2, 2.7)
house.add(doorLight)

const ghost1 = new THREE.PointLight(0xff00ff, 1.5, 3)
ghost1.rotation.z = Math.PI * 0.5
ghost1.position.set(3, 2, 2)
scene.add(ghost1)

const ghost2 = new THREE.PointLight(0x00ffff, 2, 3)
ghost2.rotation.z = Math.PI * 0.5
ghost2.position.set(-3, 2, 2)
scene.add(ghost2)



// Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(sizes.width, sizes.height)
renderer.setClearColor('#262837')
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
moonlight.castShadow = true
doorLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
walls.castShadow = true
roof.castShadow = true
door.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true
floor.receiveShadow = true

/**
 * Loop
 */
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
const clock = new THREE.Clock()
const loop = () => {
    // Update ( use elapsed time as input to function to maintian same animation speed regardless device frame speed )
    const elapsedTime = clock.getElapsedTime()
    // Update objects
    ghost1.position.x = Math.sin(elapsedTime * 3) * 4
    ghost1.position.y = Math.cos(elapsedTime * 4) * 4 + Math.sin(elapsedTime * 2.5) * 2
    ghost1.position.z = Math.cos(elapsedTime * 3) * 4
    ghost2.position.x = Math.cos(elapsedTime * 2) * 4
    ghost2.position.y = Math.sin(elapsedTime * 3) * 4 + Math.cos(elapsedTime * 2.5) * 2
    ghost2.position.z = Math.sin(elapsedTime * 2) * 4
    // Render
    controls.update();
    renderer.render(scene, camera)
    // keep looping
    window.requestAnimationFrame(loop)
}
loop()
import * as THREE from 'three';

export class Ball {
    constructor() {
        // Ball geometry and material
        const ballGeometry = new THREE.SphereGeometry(0.25, 32, 32);
        const ballMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });

		this.color = 0xffffff;

        // Ball mesh
        this.ball = new THREE.Mesh(ballGeometry, ballMaterial);
        this.ball.position.set(0, 0.75, 0); // Set initial position with y = 0.75

        // Animation parameters
        this.speed = 0.05; // Adjust speed as needed
        this.direction = new THREE.Vector3(Math.random() < 0.5 ? -1.5 : 1.5, 0, 0); // Movement direction

        // Bind animate method
        this.animate = this.animate.bind(this);
    }

	reset(){
		this.ball.position.set(0, 0.75, 0);
		this.speed = 0.05;
		this.color = 0xffffff;
		this.ball.material.color.setHex(this.color);
		this.direction = new THREE.Vector3(Math.random() < 0.5 ? -1.5 : 1.5, 0, 0);
	}

    animate() {
        // Move ball in direction
        this.ball.position.add(this.direction.clone().multiplyScalar(this.speed));

		this.adjustColorTowardsWhite();
    }

	adjustColorTowardsWhite() {
    // Extract RGB components
    	let r = (this.color >> 16) & 0xFF;
    	let g = (this.color >> 8) & 0xFF;
    	let b = this.color & 0xFF;
	
    	// Increment each component, ensuring it does not exceed 0xFF
    	r = Math.min(r + 1, 0xFF);
    	g = Math.min(g + 1, 0xFF);
    	b = Math.min(b + 1, 0xFF);
	
    	// Combine back into a single color
    	this.color = (r << 16) | (g << 8) | b;
	
    	// Update the ball's material color
    	this.ball.material.color.setHex(this.color);
	}

    getMesh() {
        return this.ball;
    }
}

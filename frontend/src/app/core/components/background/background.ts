import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-background',
    standalone: true,
    imports: [CommonModule],
    template: '<canvas #canvas></canvas>',
    styles: [`
    canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background: linear-gradient(to bottom right, #0f172a, #1e293b);
    }
  `]
})
export class BackgroundComponent implements AfterViewInit, OnDestroy {
    @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
    private ctx!: CanvasRenderingContext2D;
    private animationFrameId!: number;
    private particles: Particle[] = [];
    private mouse = { x: 0, y: 0 };

    ngAfterViewInit() {
        this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
        this.resize();
        this.initParticles();
        this.animate();
    }

    ngOnDestroy() {
        cancelAnimationFrame(this.animationFrameId);
    }

    @HostListener('window:resize')
    resize() {
        const canvas = this.canvasRef.nativeElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.initParticles();
    }

    @HostListener('window:mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
        this.mouse.x = event.clientX;
        this.mouse.y = event.clientY;
    }

    private initParticles() {
        this.particles = [];
        const particleCount = 100;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new Particle(
                this.canvasRef.nativeElement.width,
                this.canvasRef.nativeElement.height
            ));
        }
    }

    private animate() {
        this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

        this.particles.forEach(particle => {
            particle.update(this.mouse);
            particle.draw(this.ctx);
        });

        this.animationFrameId = requestAnimationFrame(() => this.animate());
    }
}

class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    baseX: number;
    baseY: number;
    density: number;

    constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.density = (Math.random() * 30) + 1;
    }

    update(mouse: { x: number, y: number }) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = 150;
        const force = (maxDistance - distance) / maxDistance;
        const directionX = forceDirectionX * force * this.density;
        const directionY = forceDirectionY * force * this.density;

        if (distance < maxDistance) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x !== this.baseX) {
                const dx = this.x - this.baseX;
                this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
                const dy = this.y - this.baseY;
                this.y -= dy / 10;
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

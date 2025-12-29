import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundService, BackgroundType } from '../../services/background.service';

interface BackgroundEffect {
    init(width: number, height: number): void;
    update(mouse: { x: number, y: number }): void;
    draw(ctx: CanvasRenderingContext2D): void;
}

@Component({
    selector: 'app-background',
    standalone: true,
    imports: [CommonModule],
    template: '<canvas #canvas [style.background]="backgroundService.currentGradient()"></canvas>',
    styles: [`
    canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      transition: background 1s ease;
    }
  `]
})
export class BackgroundComponent implements AfterViewInit, OnDestroy {
    @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
    private ctx!: CanvasRenderingContext2D;
    private animationFrameId!: number;
    private currentEffect: BackgroundEffect | null = null;
    private mouse = { x: 0, y: 0 };

    constructor(public backgroundService: BackgroundService) {
        effect(() => {
            const type = this.backgroundService.activeBackground();
            this.switchEffect(type);
        });
    }

    ngAfterViewInit() {
        this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
        this.resize();
        this.animate();
    }

    ngOnDestroy() {
        cancelAnimationFrame(this.animationFrameId);
    }

    @HostListener('window:resize')
    resize() {
        if (!this.canvasRef) return;
        const canvas = this.canvasRef.nativeElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (this.currentEffect) {
            this.currentEffect.init(canvas.width, canvas.height);
        }
    }

    @HostListener('window:mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
        this.mouse.x = event.clientX;
        this.mouse.y = event.clientY;
    }

    private switchEffect(type: BackgroundType) {
        if (!this.canvasRef) return;
        const width = this.canvasRef.nativeElement.width;
        const height = this.canvasRef.nativeElement.height;

        switch (type) {
            case 'particles':
                this.currentEffect = new ParticleEffect(width, height);
                break;
            case 'rain':
                this.currentEffect = new RainEffect(width, height);
                break;
            case 'snow':
                this.currentEffect = new SnowEffect(width, height);
                break;
            case 'leaves':
                this.currentEffect = new LeavesEffect(width, height);
                break;
            case 'stars':
                this.currentEffect = new StarEffect(width, height);
                break;
        }
    }

    private animate() {
        if (this.ctx && this.currentEffect) {
            this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
            this.currentEffect.update(this.mouse);
            this.currentEffect.draw(this.ctx);
        }
        // this.animationFrameId = requestAnimationFrame(() => this.animate());
    }
}

// --- Effects Implementation ---

class ParticleEffect implements BackgroundEffect {
    private particles: any[] = [];

    constructor(width: number, height: number) {
        this.init(width, height);
    }

    init(width: number, height: number) {
        this.particles = [];
        const particleCount = 100;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new Particle(width, height));
        }
    }

    update(mouse: { x: number, y: number }) {
        this.particles.forEach(p => p.update(mouse));
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.particles.forEach(p => p.draw(ctx));
    }
}

class Particle {
    x: number;
    y: number;
    size: number;
    baseX: number;
    baseY: number;
    density: number;

    constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 3 + 1;
        this.density = (Math.random() * 30) + 1;
    }

    update(mouse: { x: number, y: number }) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;
        const force = (maxDistance - distance) / maxDistance;
        const directionX = (dx / distance) * force * this.density;
        const directionY = (dy / distance) * force * this.density;

        if (distance < maxDistance) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x !== this.baseX) this.x -= (this.x - this.baseX) / 10;
            if (this.y !== this.baseY) this.y -= (this.y - this.baseY) / 10;
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

class RainEffect implements BackgroundEffect {
    private drops: any[] = [];
    private width = 0;
    private height = 0;

    constructor(width: number, height: number) {
        this.init(width, height);
    }

    init(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.drops = [];
        const count = 500;
        for (let i = 0; i < count; i++) {
            this.drops.push({
                x: Math.random() * width,
                y: Math.random() * height,
                length: Math.random() * 20 + 10,
                speed: Math.random() * 10 + 5
            });
        }
    }

    update() {
        this.drops.forEach(drop => {
            drop.y += drop.speed;
            if (drop.y > this.height) {
                drop.y = -drop.length;
                drop.x = Math.random() * this.width;
            }
        });
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = 'rgba(174, 194, 224, 0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        this.drops.forEach(drop => {
            ctx.moveTo(drop.x, drop.y);
            ctx.lineTo(drop.x, drop.y + drop.length);
        });
        ctx.stroke();
    }
}

class SnowEffect implements BackgroundEffect {
    private flakes: any[] = [];
    private width = 0;
    private height = 0;

    constructor(width: number, height: number) {
        this.init(width, height);
    }

    init(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.flakes = [];
        const count = 200;
        for (let i = 0; i < count; i++) {
            this.flakes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 3 + 1,
                speed: Math.random() * 2 + 1,
                wind: Math.random() * 2 - 1
            });
        }
    }

    update() {
        this.flakes.forEach(flake => {
            flake.y += flake.speed;
            flake.x += flake.wind;
            if (flake.y > this.height) {
                flake.y = -flake.radius;
                flake.x = Math.random() * this.width;
            }
        });
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        this.flakes.forEach(flake => {
            ctx.moveTo(flake.x, flake.y);
            ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        });
        ctx.fill();
    }
}

class StarEffect implements BackgroundEffect {
    private stars: any[] = [];
    private width = 0;
    private height = 0;

    constructor(width: number, height: number) {
        this.init(width, height);
    }

    init(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.stars = [];
        const count = 300;
        for (let i = 0; i < count; i++) {
            this.stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2,
                blinkSpeed: Math.random() * 0.05,
                alpha: Math.random(),
                direction: 1
            });
        }
    }

    update() {
        this.stars.forEach(star => {
            star.alpha += star.blinkSpeed * star.direction;
            if (star.alpha >= 1 || star.alpha <= 0) {
                star.direction *= -1;
            }
        });
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.stars.forEach(star => {
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.alpha)})`;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}

class LeavesEffect implements BackgroundEffect {
    private leaves: any[] = [];
    private width = 0;
    private height = 0;

    constructor(width: number, height: number) {
        this.init(width, height);
    }

    init(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.leaves = [];
        const count = 50;
        for (let i = 0; i < count; i++) {
            this.leaves.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 10 + 5,
                speed: Math.random() * 2 + 1,
                angle: Math.random() * 360,
                spin: Math.random() * 2 - 1
            });
        }
    }

    update() {
        this.leaves.forEach(leaf => {
            leaf.y += leaf.speed;
            leaf.angle += leaf.spin;
            if (leaf.y > this.height) {
                leaf.y = -leaf.size;
                leaf.x = Math.random() * this.width;
            }
        });
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'rgba(200, 100, 50, 0.6)'; // Autumn color
        this.leaves.forEach(leaf => {
            ctx.save();
            ctx.translate(leaf.x, leaf.y);
            ctx.rotate(leaf.angle * Math.PI / 180);
            ctx.beginPath();
            ctx.rect(-leaf.size / 2, -leaf.size / 2, leaf.size, leaf.size);
            ctx.fill();
            ctx.restore();
        });
    }
}

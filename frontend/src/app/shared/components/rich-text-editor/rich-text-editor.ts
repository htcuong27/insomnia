import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';

@Component({
    selector: 'app-rich-text-editor',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './rich-text-editor.html',
    styleUrls: ['./rich-text-editor.scss'],
    encapsulation: ViewEncapsulation.None, // Needed for Tiptap styles
})
export class RichTextEditorComponent implements OnInit, OnDestroy {
    @Input() content = '';
    @Input() placeholder = 'Start writing your amazing story...';
    @Output() contentChange = new EventEmitter<string>();

    editor: Editor | null = null;

    constructor(private elementRef: ElementRef) { }

    ngOnInit(): void {
        this.editor = new Editor({
            element: this.elementRef.nativeElement.querySelector('.editor-content-wrapper'),
            extensions: [
                StarterKit,
                Image,
                Link.configure({
                    openOnClick: false,
                }),
                Placeholder.configure({
                    placeholder: this.placeholder,
                }),
            ],
            content: this.content,
            editorProps: {
                attributes: {
                    class: 'prose prose-invert max-w-none focus:outline-none',
                },
            },
            onUpdate: ({ editor }) => {
                const html = editor.getHTML();
                this.contentChange.emit(html);
            },
        });
    }

    ngOnDestroy(): void {
        this.editor?.destroy();
    }

    addImage() {
        const url = window.prompt('URL');

        if (url) {
            this.editor?.chain().focus().setImage({ src: url }).run();
        }
    }

    setLink() {
        const previousUrl = this.editor?.getAttributes('link')['href'];
        const url = window.prompt('URL', previousUrl);

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === '') {
            this.editor?.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        // update link
        this.editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
}

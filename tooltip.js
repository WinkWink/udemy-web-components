class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipIcon;
        this._tooltipVisible = false;
        this._tooltipText = "dummy text for tooltip";

        // you can access the shadow dom tree from outside this component or not, open or closed 
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style>
                div{
                    font-weight:normal;
                    background-color: black;
                    color: white;
                    position: absolute;
                    z-index: 10;
                    padding: 0.15rem
                    border-radius: 3px;
                    box-shadow: 1px 1px 6px rgba(0,0,0,0.26);
                }

                :host{
                    position:relative;
                }

                :host(.important){
                    background: var(--color-primary, #ccc);
                    padding: 0.15rem;
                    position:relative;
                }

                :host-context(p){
                    font-weight: bold;
                }

                hightlight{
                    background-color:red;
                }

                ::slotted(.highlight){
                    border-bottom: 1px dotted red;
                }

                .icon{
                    background: black;
                    color: white;
                    padding: 0.15rem 0.5rem;
                    text-align:center;
                    border-radius: 50%;
                }
            </style>
            <slot>Some default</slot><span> (?)</span>`
        }

    connectedCallback() {
        if(this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text'); 
        }

        this._tooltipIcon = this.shadowRoot.querySelector("span");

        this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        this.shadowRoot.appendChild(tooltipIcon);
        this._render();
    }

    attributeChangedCallback(name, oldValue, newValue){
        if(oldValue === newValue){
            return;
        }

        if(name === 'text'){
            this._tooltipText = newValue;
        }
    }

    static get observedAttributes() {
        return ['text'];
    }

    disconnectedCallback(){
        this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip.bind(this));
        this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip.bind(this));
    }


    _render(){
        let tooltipContainer = this.shadowRoot.querySelector('div');
        if(this._tooltipVisible){
            tooltipContainer = document.createElement("div");
            tooltipContainer.textContent = this._tooltipText;
            this.shadowRoot.appendChild(tooltipContainer);
        }else{
            if(tooltipContainer){
                this.shadowRoot.removeChild(tooltipContainer);
            }
        }
    }

    _showTooltip(){
        this._tooltipVisible = true;
        this._render();
    }

    _hideTooltip(){
        this._tooltipVisible = false;
        this._render();
    }
}

customElements.define("my-tooltip", Tooltip);
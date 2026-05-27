class ConfirmLink extends HTMLAnchorElement{
    connectedCallback() {
        this.addEventListener('click', event => {
            if(!confirm("Do you really want to leave")){
                // supress default behavior
                event.preventDefault();
            }
        });
    }
}

customElements.define('my-confirm-link', ConfirmLink, { extends: 'a' });
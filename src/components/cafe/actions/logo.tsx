import { ICellRendererComp, ICellRendererParams } from "ag-grid-community";

export class CafeLogoRenderer implements ICellRendererComp {
  eGui!: HTMLSpanElement;

  // Optional: Params for rendering. The same params that are passed to the cellRenderer function.
  init(params: ICellRendererParams) {
    if (params.data.logo) {
      let cafeLogo: HTMLImageElement = document.createElement("img");
      cafeLogo.width = 50;
      cafeLogo.height = 50;
      cafeLogo.src = params.data.logo;
      cafeLogo.setAttribute("class", "logo");

      this.eGui = document.createElement("span");
      this.eGui.setAttribute("class", "imgSpanLogo");
      this.eGui.appendChild(cafeLogo);
    }
  }

  // Required: Return the DOM element of the component, this is what the grid puts into the cell
  getGui() {
    return this.eGui;
  }

  // Required: Get the cell to refresh.
  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}

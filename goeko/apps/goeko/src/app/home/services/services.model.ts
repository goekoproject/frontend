export class Services {

  title: string
  actorType: string
  section: string
  description: any;
  photo: string
  rates: any[]
  rateTitle: string

  constructor(item:any) {
    this.title = item.fields.title;
    this.actorType = item.fields.actorType;
    this.section = item.fields.section;
    // this.paragraphs = this._buildDescription(item.fields.description.content);
    this.description = item.fields.description;
    this.photo = item.fields.photo.fields.file.url;
    this.rates = this._buildRates(item.fields.rates.content);
    this.rateTitle = item.fields.rateTitle;
  }

  private _buildRates(content: any): any[] {
    const rates: any= [];
    content.forEach((element: any) => {
        if(element.nodeType === 'embedded-entry-block'){
          const rateServiceList: any = [];
          const iconRateUrlList: any= [];
            element.data.target.fields.iconRate.forEach((element: any) => {
              iconRateUrlList.push(element.fields.file.url);
            });
            element.data.target.fields.serviceList.forEach((element: any) => {
              rateServiceList.push(element);
            });
            const rate = {
            icons: iconRateUrlList,
            title: element.data.target.fields.title,
            price: element.data.target.fields.price,
            rateServices: rateServiceList
          };
          rates.push(rate);
        }
      });
      return rates;
  }

  // private _buildDescription(content: any): any[] {
  //   const paragraphs: any = [];
  //   content.forEach((element: any) => {
  //     paragraphs.push(element.content[0].value);
  //   });
  //   return paragraphs;
  // }
}

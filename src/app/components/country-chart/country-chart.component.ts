import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-chart',
  templateUrl: './country-chart.component.html',
  styleUrls: ['./country-chart.component.css']
})
export class CountryChartComponent implements OnInit, OnChanges {
  title = 'Chart';

  view: any[];
  results: any[];
  colorScheme = {
    domain: ['#2196f3', '#f50057', '#76ff03', '#d500f9', '#ffc107']
  };
  schemeType = 'ordinal';
  showAnimations = true;
  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  showGridLines = true;
  roundDomains = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Country';
  yAxisLabel = 'Population';
  gradient = false;
  barPadding = 10;
  roundEdges = true;

  constructor(private countryService: CountryService) { }

  onSelect(event) {
    // console.log(event);
  }

  ngOnInit() {
    this.getCountries();
  }

  @Input()
  countries: any[];

  ngOnChanges(changes) {
    this.getCountries();
  }

  getCountries(): void {
    this.countryService.getCountries()
      .subscribe(countries => this.results = countries);
  }

  isProcessing() {
    return this.countryService.isProcessing();
  }
}

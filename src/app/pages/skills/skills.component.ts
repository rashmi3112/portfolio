import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule,
    CommonModule,
    MatDividerModule
  ],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
skills = [
  {
    category: 'Frontend',
    icon: 'code',
    skills: [
      {name:'Angular', logo: 'public/logos/angularlogo.png'},
      {name:'JavaScript', logo: 'public/logos/jslogo.png'},
      {name:'TypeScript', logo: 'public/logos/typescriptlogo.png'},
      {name:'HTML', logo: 'public/logos/htmllogo.png'},
      {name:'CSS', logo: 'public/logos/csslogo.png'},
    ]
  },
  {
    category: 'Backend',
    icon: 'dns',
    skills: [
      {name:'.Net', logo: 'public/logos/dotnetlogo.png'},
      {name:'Python', logo: 'public/logos/pythonlogo.png'},
      {name:'Php', logo: 'public/logos/phplogo.png'},
      {name:'Java', logo: 'public/logos/javalogo.png'},
    ]
  },
  {
    category: 'Database',
    icon: 'storage',
    skills: [
      {name:'MS SQL', logo: 'public/logos/ssmslogo.png'},
      {name:'MySQL', logo: 'public/logos/mysqllogo.png'},
      {name:'Oracle', logo: 'public/logos/oraclelogo.png'},
    ]
  },
  {
    category: 'Source Control',
    icon: 'history_edu',
    skills: [
      {name: 'Git', logo: 'public/logos/gitlogo.png'},
      {name: 'Azure', logo: 'public/logos/azurelogo.png'},
    ]
  }
]
}

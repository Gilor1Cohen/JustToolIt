import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../../../../../../Core/Services/ToolsService/tools.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  AllPhysicsResponses,
  HttpErrorResponseDetails,
} from '../../../../../../Core/Models/ToolsModel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-physics-tools-multi-page-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './physics-tools-multi-page-component.component.html',
  styleUrl: './physics-tools-multi-page-component.component.css',
})
export class PhysicsToolsMultiPageComponentComponent implements OnInit {
  Loading: boolean = false;
  URL: string | null = null;
  Data: AllPhysicsResponses | null = null;
  Error: string | null = null;

  Form!: FormGroup;

  constructor(
    private tools: ToolsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.URL = this.router.url;
    this.FormInitialization();
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  extractToolName(path: string | null): string {
    if (!path) return '';

    const segments = path.split('/');
    const slug = segments[segments.length - 1];
    return slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  FormInitialization(): void {
    const slug = this.URL?.split('/').pop();
    switch (slug) {
      case 'distance-speed-time-calculator':
        this.Form = this.fb.group({
          distance: [null],
          speed: [null],
          time: [null],
        });
        break;
      case 'acceleration-calculator':
        this.Form = this.fb.group({
          initialVelocity: [null, Validators.required],
          finalVelocity: [null, Validators.required],
          time: [null, [Validators.required, Validators.min(0.0001)]],
        });
        break;
      case 'kinematic-motion-solver':
        this.Form = this.fb.group({
          initialVelocity: [null, Validators.required],
          acceleration: [null, Validators.required],
          time: [null, Validators.required],
        });
        break;
      case 'free-fall-calculator':
        this.Form = this.fb.group(
          {
            height: [null],
            time: [null],
            impactSpeed: [null],
          },
          {
            validators: this.atLeastOneValidator(
              'height',
              'time',
              'impactSpeed'
            ),
          }
        );
        break;
      case 'force-calculator':
        this.Form = this.fb.group({
          mass: [null, Validators.required],
          acceleration: [null, Validators.required],
        });
        break;
      case 'work-and-energy-calculator':
        this.Form = this.fb.group({
          force: [null, Validators.required],
          displacement: [null, Validators.required],
        });
        break;
      case 'kinetic-potential-energy-calculator':
        this.Form = this.fb.group(
          {
            mass: [null, Validators.required],
            velocity: [null],
            height: [null],
          },
          {
            validators: this.atLeastOneValidator('velocity', 'height'),
          }
        );
        break;
      case 'torque-calculator':
        this.Form = this.fb.group({
          force: [null, Validators.required],
          distance: [null, Validators.required],
        });
        break;
      case 'heat-transfer-calculator':
        this.Form = this.fb.group({
          mass: [null, Validators.required],
          specificHeat: [null, Validators.required],
          temperatureChange: [null, Validators.required],
        });
        break;
      case 'radioactive-half-life-calculator':
        this.Form = this.fb.group({
          initialMass: [null, Validators.required],
          halfLife: [null, Validators.required],
          time: [null, Validators.required],
        });
        break;
      case 'photon-energy-calculator':
        this.Form = this.fb.group(
          {
            wavelength: [null],
            frequency: [null],
          },
          {
            validators: this.atLeastOneValidator('wavelength', 'frequency'),
          }
        );
        break;
      default:
        this.Form = this.fb.group({});
    }
  }

  atLeastOneValidator(...fields: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const group = control as FormGroup;
      const hasOne = fields.some((f) => !!group.get(f)?.value);
      return hasOne ? null : { atLeastOne: true };
    };
  }

  onSubmit(): void {
    this.Loading = true;
    this.Error = null;
    this.Data = null;

    const slug = this.URL?.split('/').pop();
    let request: Observable<AllPhysicsResponses>;

    switch (slug) {
      case 'distance-speed-time-calculator':
        request = this.tools.computeDistanceSpeedTime(this.Form.value);
        break;
      case 'acceleration-calculator':
        request = this.tools.calculateAcceleration(this.Form.value);
        break;
      case 'kinematic-motion-solver':
        request = this.tools.solveKinematicMotion(this.Form.value);
        break;
      case 'free-fall-calculator':
        request = this.tools.calculateFreeFall(this.Form.value);
        break;
      case 'force-calculator':
        request = this.tools.calculateForce(this.Form.value);
        break;
      case 'work-and-energy-calculator':
        request = this.tools.calculateWorkAndEnergy(this.Form.value);
        break;
      case 'kinetic-potential-energy-calculator':
        request = this.tools.calculateKineticPotentialEnergy(this.Form.value);
        break;
      case 'torque-calculator':
        request = this.tools.calculateTorque(this.Form.value);
        break;
      case 'heat-transfer-calculator':
        request = this.tools.calculateHeatTransfer(this.Form.value);
        break;
      case 'radioactive-half-life-calculator':
        request = this.tools.calculateRadioactiveHalfLife(this.Form.value);
        break;
      case 'photon-energy-calculator':
        request = this.tools.calculatePhotonEnergy(this.Form.value);
        break;
      default:
        this.Loading = false;
        return;
    }

    request.subscribe({
      next: (value: AllPhysicsResponses) => {
        this.Data = value;
        this.Loading = false;
      },
      error: (err: HttpErrorResponseDetails) => {
        this.Loading = false;

        if (err.error.message === 'Missing token.') {
          const currentUrl = this.router.url;
          this.router.navigate(['/LogIn'], {
            queryParams: { returnUrl: currentUrl },
          });
        }

        this.Error = err.error.message;
      },
    });
  }

  getDataEntries(): { key: string; value: any }[] {
    return this.Data
      ? Object.entries(this.Data).map(([key, value]) => ({ key, value }))
      : [];
  }
}

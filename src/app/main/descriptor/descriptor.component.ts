import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn, NgSelectOption } from '@angular/forms';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { log } from 'util';
import { DescriptorConfig } from '../../model/DescriptorConfig';
import { Descriptor } from '../../model/Descriptor';
import { ConfigItems } from '../../model/ConfigItems';
import { ScopeSystemDetails } from '../../model/ScopeSystemDetails';
import { ScopeServiceDetails } from '../../model/ScopeServiceDetails';
import { ScopeComponentDetails } from '../../model/ScopeComponentDetails';
import { ScopeDeviceDetails } from '../../model/ScopeDeviceDetails';
import { ScopeModuleDetails } from '../../model/ScopeModuleDetails';
import { DescriptorService } from '../../srevices/descriptor.service';
import { matchingDefaultValuePossibleValues, validateArrayNotEmpty , requireCheckboxesToBeCheckedValidator} from '../../shared/validators';
import { AppConstants } from '../../shared/constants';
import { Scope } from '../../model/Scope';

import {MatSnackBar  , MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { DialogComponent } from '../dialog/dialog.component';
import { saveAs } from 'file-saver';
import { DialogSuccessComponent } from '../dialog-success/dialog-success.component';

@Component({
  selector: 'descriptor',
  templateUrl: './descriptor.component.html',
  styleUrls: ['./descriptor.component.scss']
})


export class DescriptorComponent implements OnInit {

  /**
   * Constructor
   *
   * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
   */











  constructor(private _formBuilder: FormBuilder, private descriptorService: DescriptorService,
              public dialog: MatDialog, private datePipe: DatePipe
  ) {
   
    this._unsubscribeAll = new Subject();
    
    

  }



 
    get init(): FormGroup {
    
   const conf =  
     this._formBuilder.group({
      Key: ['', [Validators.required, Validators.pattern(AppConstants.KEY_REGEX)]],
      Doc: ['', Validators.required],
      TypeI: [null, Validators.required],
      CanBeChangedByCheckboxGroup: new FormGroup({
        D: new FormControl(true),
        RM: new FormControl(true),
        PT: new FormControl(true),
        SBST: new FormControl(true),
        CST: new FormControl(false),
        SBFT: new FormControl(false),
        CFT: new FormControl(false),
        SBOT: new FormControl(true),
        COT: new FormControl(false),
      }, requireCheckboxesToBeCheckedValidator()),
      possibleValues: this._formBuilder.array(this.possibleValues.names, validateArrayNotEmpty),
      DefaultValue: ['', Validators.required],
      Pattern: [''],
      Nature: ['', Validators.required],
      OnChangeI: ['', Validators.required],
      dependencies: this._formBuilder.array([]),
   
    }, {validator: matchingDefaultValuePossibleValues('DefaultValue', 'possibleValues')});
  
   console.log(this.formGroupConfigItems);
  

   return conf;
  }

  
    get dependenciesArray(): FormGroup {
     
    return this._formBuilder.group({
      name: ['', Validators.required],
      dependOn: ['', Validators.required],
      onChange: ['', Validators.required],
     
    });
  }

  // chiplists
  @ViewChild('chipList1', { static: false }) chipList1: MatChipList;
  @ViewChild('chipList2', { static: false }) chipList2: MatChipList;
  @ViewChild('chipList3', { static: false }) chipList3: MatChipList;
  @ViewChild('chipList4', { static: false }) chipList4: MatChipList;
  @ViewChild('chipList5', { static: false }) chipList5: MatChipList;
  @ViewChild('chipList6', { static: false }) chipList6: MatChipList;
  @ViewChild('chipListPV', { static: false }) chipListPV: MatChipList;

  @ViewChild('type', { static: false }) type: MatSelect;


  @ViewChild('fileInput', {static: true}) myFileInput;

  // descriptor object
  descriptorConfig: DescriptorConfig;
  descriptor: Descriptor;
  scope: Scope;
  scopeSystemDetails: ScopeSystemDetails;
  scopeServiceDetails: ScopeServiceDetails;
  scopeComponentDetails: ScopeComponentDetails;
  scopeDeviceDetails: ScopeDeviceDetails;
  scopeModuleDetails: ScopeModuleDetails;
  configItems: ConfigItems[];
  // form: FormGroup;


  panelOpenState = false;


  


  
s: string;


  // Vertical Stepper
  verticalStepperStepDescriptorDetails: FormGroup;
  verticalStepperStepSystemScope: FormGroup;
  verticalStepperStepServiceScope: FormGroup;
  verticalStepperStepComponentScope: FormGroup;
  verticalStepperStepDeviceScope: FormGroup;
  verticalStepperStepModuleScope: FormGroup;

  formGroupConfigItems: FormGroup;
  formArrayConfigItems: FormArray;


  // Private
  private _unsubscribeAll: Subject<any>;
  Scope = new FormControl('', Validators.required);


  // options
  ScopeOptions = AppConstants.SCOPE_OPTIONS;
  optionsType = AppConstants.TYPE_OPTIONS;
  optionsNature = AppConstants.NATURE_OPTIONS;
  optionsDependOn = AppConstants.DEPENDON_OPTIONS;



  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  serviceNamesComp = {
    names: []
  };
  systemNamesComp = {
    names: []
  };
  data = {
    names: []
  };
  deviceSystNames = {
    names: []
  };
  deviceModNames = {
    names: []
  };
  systemModNames = {
    names: []
  };
  possibleValues = {
    names: []
  };
  date: string;
 

  // upload file 
  // fileData = null;
  fileToUpload: File = null;




  fileContent = '';


  ngOnInit(): void {

     // Vertical Stepper form stepper
     this.verticalStepperStepDescriptorDetails = this._formBuilder.group({
      SyntaxVersion: ['', [Validators.required, Validators.pattern(AppConstants.SYNTAXVERSION_REGEX)]],
      Name: ['', [Validators.required, Validators.pattern(AppConstants.NAME_REGEX)]],
      Maintainer: ['', [Validators.required, Validators.pattern(AppConstants.MAINTAINER_REGEX)]],
      Description: ['', Validators.required],
      Scope: this.Scope,
      Version: ['', [Validators.required, Validators.pattern(AppConstants.VERSION_REGEX)]],

    });

     this.verticalStepperStepSystemScope = this._formBuilder.group({
      sysName: ['', [Validators.required, Validators.pattern(AppConstants.NAME_REGEX)]],


    });

     this.verticalStepperStepServiceScope = this._formBuilder.group({
      serviceName: ['', [Validators.required, Validators.pattern(AppConstants.NAME_REGEX)]],
      names: this._formBuilder.array(this.data.names, validateArrayNotEmpty)
    });

     this.verticalStepperStepComponentScope = this._formBuilder.group({
      componentName: ['', [Validators.required, Validators.pattern(AppConstants.NAME_REGEX)]],
      serviceNamesComp: this._formBuilder.array(this.serviceNamesComp.names, validateArrayNotEmpty),
      systemNamesComp: this._formBuilder.array(this.systemNamesComp.names, validateArrayNotEmpty)
    });
     this.verticalStepperStepDeviceScope = this._formBuilder.group({
      deviceName: ['', [Validators.required, Validators.pattern(AppConstants.NAME_REGEX)]],
      deviceSystNames: this._formBuilder.array(this.deviceSystNames.names, validateArrayNotEmpty)
    });
     this.verticalStepperStepModuleScope = this._formBuilder.group({
      moduleName: ['', [Validators.required, Validators.pattern(AppConstants.NAME_REGEX)]],
      deviceModNames: this._formBuilder.array(this.deviceModNames.names, validateArrayNotEmpty),
      systemModNames: this._formBuilder.array(this.systemModNames.names, validateArrayNotEmpty)
    });
    /*********************** chiplist status */

     this.verticalStepperStepServiceScope.get('names').statusChanges.subscribe(
      status => this.chipList1.errorState = status === 'INVALID'
    );

     this.verticalStepperStepComponentScope.get('serviceNamesComp').statusChanges.subscribe(
      status => this.chipList2.errorState = status === 'INVALID'
    );
     this.verticalStepperStepComponentScope.get('systemNamesComp').statusChanges.subscribe(
      status => this.chipList3.errorState = status === 'INVALID'
    );
     this.verticalStepperStepDeviceScope.get('deviceSystNames').statusChanges.subscribe(
      status => this.chipList4.errorState = status === 'INVALID'
    );
     this.verticalStepperStepModuleScope.get('deviceModNames').statusChanges.subscribe(
      status => this.chipList5.errorState = status === 'INVALID'
    );
     this.verticalStepperStepModuleScope.get('systemModNames').statusChanges.subscribe(
      status => this.chipList6.errorState = status === 'INVALID'
    );

   



     this.formGroupConfigItems = this._formBuilder.group({
      formArrayConfigItems: this._formBuilder.array([this.init])
    });

    /* this.formGroup.get('form').get('possibleValues').statusChanges.subscribe(
       status => this.chipListPV.errorState = status === 'INVALID'
     );*/
     this.formArrayConfigItems = this.formGroupConfigItems.get('formArrayConfigItems') as FormArray;
     this.formArrayConfigItems.controls.forEach((d: FormGroup) => console.log(d.get('possibleValues')));
     this.formArrayConfigItems.controls.forEach((d: FormGroup) => d.get('possibleValues').statusChanges.subscribe(
      status => this.chipListPV.errorState = status === 'INVALID'
    ));

    


  }



  update() {

    this.formArrayConfigItems.controls.forEach((d: FormGroup) => {
      if (d.get('Pattern').value.length != 0){
        d.get('TypeI').setValue('STRING');
      }
      else{
        d.get('TypeI').setValue(null);
      }
      }
    );

  }

  


  
 emptyTable(rows: FormArray) {
    while (rows.length !== 0) {
      rows.removeAt(0);
    }

  }

  

  addDependencie(configItem) {
   
    // this.updateView(configItem.get("dependencies"));
    configItem.get('dependencies').push(this.dependenciesArray);
   
   
  }
  deleteDependencie(configItem, index) {
    configItem.get('dependencies').removeAt(index);
   
  }



  initName(name: string): FormControl {
    return this._formBuilder.control(name);
  }
  add(event: MatChipInputEvent, form: FormGroup, itemName: string): void {
    const input = event.input;
    const value = event.value;

    if (this.verticalStepperStepDescriptorDetails.get('Scope').value == 'SERVICE') {
      // Add name
      if ((value || '').trim()) {
        const control = form.get('names') as FormArray;
        control.push(this.initName(value.trim()));
        console.log(control);
      }
    }
    else if (this.verticalStepperStepDescriptorDetails.get('Scope').value == 'COMPONENT') {
      if (itemName == 'Service') {
        if ((value || '').trim()) {
          const control = form.get('serviceNamesComp') as FormArray;
          control.push(this.initName(value.trim()));
          console.log(control);
        }
      }
      else if (itemName == 'System') {
        if ((value || '').trim()) {
          const control = form.get('systemNamesComp') as FormArray;
          control.push(this.initName(value.trim()));
          console.log(control);
        }
      }

    }
    else if (this.verticalStepperStepDescriptorDetails.get('Scope').value == 'DEVICE') {
      if ((value || '').trim()) {
        const control = form.get('deviceSystNames') as FormArray;
        control.push(this.initName(value.trim()));
        console.log(control);
        console.log(form.get('deviceSystNames').value.name);
      }
    }
    else if (this.verticalStepperStepDescriptorDetails.get('Scope').value == 'MODULE') {
      if (itemName == 'Device') {
        if ((value || '').trim()) {
          const control = form.get('deviceModNames') as FormArray;
          control.push(this.initName(value.trim()));
          console.log(control);
        }
      }
      else if (itemName == 'System') {
        if ((value || '').trim()) {
          const control = form.get('systemModNames') as FormArray;
          control.push(this.initName(value.trim()));
          console.log(control);
        }
      }

    }


    // Reset the input value
    if (input) {
      input.value = '';
    }
  }


  addPv(event: MatChipInputEvent, form: FormGroup, itemName: string): void {
    const input = event.input;
    const value = event.value;
    if (itemName == 'pv') {
      if ((value || '').trim()) {
        const control = form.get('possibleValues') as FormArray;
        control.push(this.initName(value.trim()));
        console.log(control);
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }




  remove(form, index, itemName: string) {
    if (this.verticalStepperStepDescriptorDetails.get('Scope').value == 'SERVICE') {
      console.log(form);
      form.get('names').removeAt(index);
    }
    else if (this.verticalStepperStepDescriptorDetails.get('Scope').value == 'COMPONENT') {
      if (itemName == 'Service') {
        console.log(form);
        form.get('serviceNamesComp').removeAt(index);
      }
      else if (itemName == 'System') {
        console.log(form);
        form.get('systemNamesComp').removeAt(index);
      }
    }
    else if (this.verticalStepperStepDescriptorDetails.get('Scope').value == 'DEVICE') {
      console.log(form);
      form.get('deviceSystNames').removeAt(index);
    }
    else if (this.verticalStepperStepDescriptorDetails.get('Scope').value == 'MODULE') {
      if (itemName == 'Device') {
        console.log(form);
        form.get('deviceModNames').removeAt(index);
      }
      else if (itemName == 'System') {
        console.log(form);
        form.get('systemModNames').removeAt(index);
      }
    }

    if (itemName == 'pv') {
      console.log(form);
      form.get('possibleValues').removeAt(index);
    }

  }

  removePv(form, index, itemName: string) {

    if (itemName == 'pv') {
      console.log(form);
      form.get('possibleValues').removeAt(index);
    }

  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


  createDescriptorObject(): void {
    this.descriptorConfig = new DescriptorConfig(
      this.verticalStepperStepDescriptorDetails.get('SyntaxVersion').value,
      this.verticalStepperStepDescriptorDetails.get('Name').value,
      this.verticalStepperStepDescriptorDetails.get('Maintainer').value,
      this.verticalStepperStepDescriptorDetails.get('Description').value,
      this.verticalStepperStepDescriptorDetails.get('Scope').value,
      this.verticalStepperStepDescriptorDetails.get('Version').value);

    
    this.configItems = this.formGroupConfigItems.get('formArrayConfigItems').value;
    this.descriptor = new Descriptor(this.descriptorConfig, this.configItems);

    switch (this.descriptorConfig.scope) {
      case 'SYSTEM':

        {
          console.log('system case !!' + this.descriptorConfig.scope);

          this.scopeSystemDetails = new ScopeSystemDetails(this.verticalStepperStepSystemScope.get('sysName').value);
          this.descriptor.setScope(this.scopeSystemDetails);
          break;
        }
      case 'SERVICE':

        {
          this.scopeServiceDetails = new ScopeServiceDetails(this.verticalStepperStepServiceScope.get('serviceName').value
            , this.verticalStepperStepServiceScope.get('names').value);
          this.descriptor.setScope(this.scopeServiceDetails);
          break;
        }
      case 'COMPONENT':

        {
          this.scopeComponentDetails = new ScopeComponentDetails(
            this.verticalStepperStepComponentScope.get('componentName').value,
            this.verticalStepperStepComponentScope.get('serviceNamesComp').value,
            this.verticalStepperStepComponentScope.get('systemNamesComp').value);
          this.descriptor.setScope(this.scopeComponentDetails);
          break;
        }
      case 'DEVICE':

        {
          this.scopeDeviceDetails = new ScopeDeviceDetails(
            this.verticalStepperStepDeviceScope.get('deviceName').value,
            this.verticalStepperStepDeviceScope.get('deviceSystNames').value
          );
          this.descriptor.setScope(this.scopeDeviceDetails);
          break;
        }
      case 'MODULE':

        {
          this.scopeModuleDetails = new ScopeModuleDetails(
            this.verticalStepperStepModuleScope.get('moduleName').value,
            this.verticalStepperStepModuleScope.get('deviceModNames').value,
            this.verticalStepperStepModuleScope.get('systemModNames').value
          );
          this.descriptor.setScope(this.scopeModuleDetails);
          break;
        }

      default:
        break;
    }


    console.log(this.descriptor);
  }
  
  
  openDialog(msg: string, type: string, dialogC) {
    const dialogRef = this.dialog.open(dialogC, {
      height: '200px',
      width: '500px',
      data: {message: msg, type: type}
    });
  }

  

  /**
   * Finish the vertical stepper
   */
  finishVerticalStepper(): void {

   
    this.createDescriptorObject();
    this.descriptorService.createDescriptor(this.descriptor)
      .subscribe( value => {
        if (value != null){
          console.log('[POST] create descriptor successfully', value);
          this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd_hh-mm');
          this.downloadFile('Config-Descriptor' + this.date + '.yml');
        }
        else {
          console.log('config descriptor null', value);
          
        }
       
       
  
     
     
      }, error => {
        console.log('FAIL to create descriptor!', error.error.message);
        this.openDialog(error.error.message, 'Error', DialogComponent);
      },
      () => {
        console.log('POST descriptor - now completed.');
      });
      
    

  }

  addToElasticSearch(): void {

   
    this.createDescriptorObject();
    this.descriptorService.addDescriptor(this.descriptor)
      .subscribe( value => {
        if (value != null){
          console.log('[POST] added descriptor successfully', value);
          this.openDialog('Added config descriptor successfully to elasticSerach', 'Success', DialogSuccessComponent);
        }
        else {
          console.log('config descriptor null', value);
          
        }
       
       
  
     
     
      }, error => {
        console.log('FAIL to add descriptor!', error.error.message);
        this.openDialog(error.error.message, 'error', DialogComponent);
      },
      () => {
        console.log('POST descriptor - now completed.');
      });
      
    

  }

  downloadFile(fileName){
   

    this.descriptorService.download().subscribe(data => {
      saveAs(new Blob([data], {type: 'application/yml'}), fileName);
    });
  }
  
  addConfigItem(): void {
    console.log('addiing');

   
    
    const confItem = this.init;
    (this.formGroupConfigItems.get('formArrayConfigItems') as FormArray).push(confItem);
     
   
  }
  
  deleteConfigItem(index){
    console.log('deleting');

    (this.formGroupConfigItems.get('formArrayConfigItems') as FormArray).removeAt(index);
  }
  // upload file
 
 
  onSubmit() {
    const formData = new FormData();
    
    formData.append('file', this.fileToUpload);
    this.descriptorService.upload(formData);
  }

  uploadConfigDescriptor(files: FileList): void {
   
    this.fileToUpload = files.item(0);
    this.descriptorService.uploadFile(this.fileToUpload).subscribe(data => {
      
        this.resetForms();
        console.log( data.swcomponent.services);
      
        this.verticalStepperStepDescriptorDetails.setValue({
        SyntaxVersion: data.configDesc ,
        Name: data.name,
        Maintainer: data.maintainer,
        Description: data.description,
        Scope: data.scope,
        Version: data.version
       });
        this.verticalStepperStepComponentScope.patchValue({
        componentName: data.swcomponent.name,
      
       });
       
        data.swcomponent.services.forEach(element => {
        (this.verticalStepperStepComponentScope.get('serviceNamesComp') as FormArray).controls.push(this.initName(element.trim()));
      });
        data.swcomponent.systems.forEach(element => {
        (this.verticalStepperStepComponentScope.get('systemNamesComp') as FormArray).controls.push(this.initName(element.trim()));
      });
    
     // console.log(this.verticalStepperStepDescriptorDetails);
        console.log('-------------------------------');
      
     // console.log(this.verticalStepperStepComponentScope);
      

        (this.formGroupConfigItems.get('formArrayConfigItems') as FormArray).clear();
        for (let index = 0; index <  data.configItems.length; index++) {
      
       (this.formGroupConfigItems.get('formArrayConfigItems') as FormArray).push(this.init);
       
       (this.formGroupConfigItems.get('formArrayConfigItems') as FormArray).controls[index].patchValue({
        Key: data.configItems[index].key ,
        Doc: data.configItems[index].doc,
        TypeI: data.configItems[index].type,
        DefaultValue: data.configItems[index].defaultValue,
        Pattern: data.configItems[index].pattern,
        Nature: data.configItems[index].nature,
        OnChangeI: data.configItems[index].onChange
       });
      

     
   
       data.configItems[index].possibleValues.forEach(element => {
       ((this.formGroupConfigItems.get('formArrayConfigItems') as FormArray).controls[index].get('possibleValues') as FormArray).controls.push(this.initName(element.trim()));
       });

       data.configItems[index].dependencies.forEach(element => {
        ((this.formGroupConfigItems.get('formArrayConfigItems') as FormArray).controls[index].get('dependencies') as FormArray).controls.push(this.dependenciesArrayInit(element));
        });

       data.configItems[index].canBeChangedBy.forEach(element => {
          switch (element) {
            case 'D' :
            {
              (this.formGroupConfigItems.get('formArrayConfigItems') as FormArray).controls[index].get('CanBeChangedByCheckboxGroup').patchValue({
                D: true,
              });
              break;
            }
            case 'RM': {
              (this.formGroupConfigItems.get('formArrayConfigItems') as FormArray).controls[index].get('CanBeChangedByCheckboxGroup').patchValue({
                RM: true
              });
              break;
            }
            case 'PT': {
              (this.formGroupConfigItems.get('formArrayConfigItems') as FormArray).controls[index].get('CanBeChangedByCheckboxGroup').patchValue({
                PT: true
              });
              break;
            }
            case 'SBST': {
              (this.formGroupConfigItems.get('formArrayConfigItems') as FormArray).controls[index].get('CanBeChangedByCheckboxGroup').patchValue({
                SBST: true
              });
              break;
            }
            case 'CST': {
              (this.formGroupConfigItems.get('formArrayConfigItems') as FormArray).controls[index].get('CanBeChangedByCheckboxGroup').patchValue({
                CST: true
              });
              break;
            }
            case 'SBFT': {
              (this.formGroupConfigItems.get('formArrayConfigItems') as FormArray).controls[index].get('CanBeChangedByCheckboxGroup').patchValue({
                SBFT: true
              });
              break;
            }
            case 'CFT': {
              (this.formGroupConfigItems.get('formArrayConfigItems') as FormArray).controls[index].get('CanBeChangedByCheckboxGroup').patchValue({
                CFT: true
              });
              break;
            }
            case 'SBOT': {
              (this.formGroupConfigItems.get('formArrayConfigItems') as FormArray).controls[index].get('CanBeChangedByCheckboxGroup').patchValue({
                SBOT: true
              });
              break;
            }
            case 'COT': {
              (this.formGroupConfigItems.get('formArrayConfigItems') as FormArray).controls[index].get('CanBeChangedByCheckboxGroup').patchValue({
                COT: true
              });
              break;
            }
              
             
          
            default:
              break;
          }
        });


      }
        this.formGroupConfigItems.patchValue(data.configItems);
        console.log(this.formGroupConfigItems);
      

       
        
    });
}

dependenciesArrayInit(element): FormGroup {
     
  return this._formBuilder.group({
    name: element.name,
    dependOn: element.with,
    onChange: element.onChange,
   
  });
}
setOption(value: string, tab){
  for (let index = 0; index <  tab.length; index++) {
    if (value == tab[index].name){
      return tab[index];
    }
  }

}

resetForms(): void{
  this.verticalStepperStepDescriptorDetails.reset;
  this.verticalStepperStepComponentScope.reset;
  const servicename = (this.verticalStepperStepComponentScope.get('serviceNamesComp') as FormArray);
  const sysname = (this.verticalStepperStepComponentScope.get('systemNamesComp') as FormArray);
       
  for (let index = 0; index < sysname.length + 1; index++) {
    sysname.controls.pop();
    
  }
  for (let index = 0; index < servicename.length + 1; index++) {
    servicename.controls.pop();
    
  }
  // (<FormArray>this.verticalStepperStepComponentScope.get('serviceNamesComp')).controls.pop;
 // (<FormArray>this.verticalStepperStepComponentScope.get('systemNamesComp')).controls.pop;
  this.verticalStepperStepDeviceScope.reset;
  this.verticalStepperStepModuleScope.reset;
  this.verticalStepperStepServiceScope.reset;
  this.verticalStepperStepSystemScope.reset;
  this.formGroupConfigItems.reset;
  (this.formGroupConfigItems.get('formArrayConfigItems') as FormArray).clear();

}

}


import { getLevels, newLevel, updateLevel, deleteLevel, deleteMultipleLevels } from './LevelService';
import { getDivisions, newDivision, updateDivision, deleteDivision, deleteMultipleDivisions } from './DivisionService';
import { getSpecialities, newSpeciality, updateSpeciality, deleteSpeciality, deleteMultipleSpecialities } from './SpecialityService'
import { getGrades, newGrade, updateGrade, deleteGrade, deleteMultipleGrades } from './GradeService';

export default class AdminService {
  async getLevels() {
    return await getLevels();
  }

  async newLevel(level) {
    return await newLevel(level);
  }

  async updateLevel(id, level) {
    return await updateLevel(id, level);
  }

  async deleteLevel(id) {
    return await deleteLevel(id);
  }

  async deleteMultipleLevels(levelList) {
    return await deleteMultipleLevels(levelList);
  }
  
  async getDivisions() {
    return await getDivisions();
  }

  async newDivision(division) {
    return await newDivision(division);
  }

  async updateDivision(id, division) {
    return await updateDivision(id, division);
  }

  async deleteDivision(id) {
    return await deleteDivision(id);
  }

  async deleteMultipleDivisions(divisionList) {
    return await deleteMultipleDivisions(divisionList);
  }

  async getSpecialities() {
    return await getSpecialities();
  }

  async newSpeciality(speciality) {
    return await newSpeciality(speciality);
  }

  async updateSpeciality(id, speciality) {
    return await updateSpeciality(id, speciality);
  }

  async deleteSpeciality(id) {
    return await deleteSpeciality(id);
  }

  async deleteMultipleSpecialities(specialityList) {
    return await deleteMultipleSpecialities(specialityList);
  }


  async getGrades() {
    return await getGrades();
  }

  async newGrade(grade) {
    return await newGrade(grade);
  }

  async updateGrade(id, grade) {
    return await updateGrade(id, grade);
  }

  async deleteGrade(id) {
    return await deleteGrade(id);
  }

  async deleteMultipleGrades(gradeList) {
    return await deleteMultipleGrades(gradeList);
  }
}

  // async newStudent(student) {
  //   const response = await clienteAxios.post('/api/secretaria/alumno/', student);
  //   return response;
  // }

  // async getPerson(id) {
  //   const response = await clienteAxios.get(`/api/administracion/person/${id}/`);
  //   return response;
  // }

  // async getPersonEmail(email) {
  //   const response = await clienteAxios.post('/api/administracion/checkemail/', email);
  //   return response;
  // }

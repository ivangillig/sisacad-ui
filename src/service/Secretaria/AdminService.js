
import { getLevels, newLevel, updateLevel, deleteLevel, deleteMultipleLevels } from './LevelService';
import { getDivisions, newDivision, updateDivision, deleteDivision, deleteMultipleDivisions } from './DivisionService';
import { getSpecialities, newSpeciality, updateSpeciality, deleteSpeciality, deleteMultipleSpecialities } from './SpecialityService'
import { getGrades, newGrade, updateGrade, deleteGrade, deleteMultipleGrades } from './GradeService';
import { getCourses, newCourse, updateCourse, deleteCourse, deleteMultipleCourses, getCourse } from './CoursesService';
import { getPerson, getPersonEmail } from './UserService';
import { newStudent, getStudents, deleteStudent, deleteMultipleStudents, createNewPaymentAndPaymentStudent } from './StudentService';

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

  async getPerson(id) {
    return await getPerson(id);
  }

  async getPersonEmail(email) {
    return await getPersonEmail(email);
  }

  async newStudent(student) {
    return await newStudent(student)
  }

  async getStudents() {
    return await getStudents()
  }

  async deleteStudent(id) {
    return await deleteStudent(id)
  }

  async deleteMultipleStudents(studentsList) {
    return await deleteMultipleStudents(studentsList)
  }

  async createNewPaymentAndPaymentStudent(formData) {
    return await createNewPaymentAndPaymentStudent(formData)
  }

  async getCourses() {
    return await getCourses();
  }

  async getCourse(id) {
    return await getCourse(id);
  }

  async newCourse(course) {
    return await newCourse(course);
  }

  async updateCourse(id, course) {
    return await updateCourse(id, course);
  }

  async deleteCourse(id) {
    return await deleteCourse(id);
  }

  async deleteMultipleCourses(courseList) {
    return await deleteMultipleCourses(courseList);
  }

}

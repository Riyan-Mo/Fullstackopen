interface CourseDescription extends CoursePartBase{
    description: string;
}

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}
  
interface CoursePartBasic extends CoursePartBase, CourseDescription {
    kind: "basic"
}
  
interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}
  
interface CoursePartBackground extends CoursePartBase, CourseDescription {
    backgroundMaterial: string;
    kind: "background"
}

interface CoursePartSpecial extends CoursePartBase, CourseDescription{
    requirements: string[],
    kind: "special",
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;
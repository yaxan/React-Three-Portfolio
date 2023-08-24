import React from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import styles from './WorkExperienceTimeline.module.css';
import smartARM from '../media/smartARM.png'
import infinera from '../media/infinera.jpg'
import reuters from '../media/reuters.jpg'
import cox from '../media/cox.jpg'
import cn from '../media/cn.jpg'
import hdsb from '../media/hdsb.jpg'
import bearworks from '../media/bearworks.png'

const jobs = [
    // Add more jobs here
    {
      title: 'Software Engineer Intern',
      company: 'Bearworks',
      startDate: 'May 2023',
      endDate: 'Sept 2023',
      description: 'Worked alongside founders to build startup from inception, guiding product development, evaluating different technologies/vendors, leading AI tooling efforts, and making technical architecture decisions landing in production',
      Icon: bearworks,
    },
    {
      title: 'Embedded Software Developer Intern',
      company: 'smartARM',
      startDate: 'Mar 2023',
      endDate: 'Present',
      description: 'Designing and developing upper-limb prostheses controls system and EMG signal processing code in Python',
      Icon: smartARM,
    },
    {
      title: 'Software Development Engineer Intern',
      company: 'Infinera',
      startDate: 'Sept 2022',
      endDate: 'Dec 2022',
      description: 'Worked as part of the ASIC SDK team to implement Digital Sub-carrier APIs, instrument SDK for heap memory and CPU profiling, and various other tasks working primarily in C++',
      Icon: infinera,
    },
    {
      title: 'Software Developer Intern',
      company: 'Thomson Reuters',
      startDate: 'Jan 2022',
      endDate: 'Apr 2022',
      description: 'Worked as software developer researching and prototpying distrubuted trace generation/collection with OpenTelemetry and fixing vulnerabilities in .NET Core',
      Icon: reuters,
    },
    {
        title: 'Software Engineer Intern',
        company: 'Cox Automotive Inc.',
        startDate: 'May 2021',
        endDate: 'Sept 2021',
        description: 'Developed, maintained and updated financial web applications for car dealerships using Angular, ASP.NET Core and C#',
        Icon: cox,  
    },
      {
        title: 'Programming Teacher',
        company: 'Code Ninjas',
        startDate: 'Nov 2019',
        endDate: 'Sept 2020',
        description: 'Taught students ages 7-14 how to program games with JavaScript, Unity 3D, and LUA as well as designed an online ROBLOX LUA course for 100+ students in Ontario to enroll in during lockdown',
        Icon: cn,
    },
      {
        title: 'Full-Stack Development Co-op',
        company: 'Halton District School Board',
        startDate: 'Sept 2019',
        endDate: 'Feb 2020',
        description: 'Worked as a junior full-stack web developer in creating a web application to audit third party application use of staff G-Suite accounts by leveraging Google APIs replacing the manual report system for 6246 staff members',
        Icon: hdsb,  
    },
  ];


  const WorkExperienceTimeline = () => {
    return (
      <div className={styles.timeline}>
        <VerticalTimeline animate={true} layout="1-column">
          {jobs.map((job, index) => (
            <VerticalTimelineElement
              key={index}
              className={styles.verticalTimelineElement}
              contentStyle={{
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(128, 128, 128, 0.6))',
                backgroundSize: '250% 100%',
                color: '#fff',
              }}
              contentArrowStyle={{
                borderRight: '7px solid transparent',
              }}
              date={`${job.startDate} - ${job.endDate}`}
              dateClassName={styles.dateStyle}
              iconStyle={{

              }}
              icon={<img src={job.Icon} alt="job icon" className={styles.iconImage} />}
            >
              <h3 className="vertical-timeline-element-title">{job.title}</h3>
              <h4 className="vertical-timeline-element-subtitle">{job.company}</h4>
              <p className={styles.jobDescription}>{job.description}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    );
  };
  
  export default WorkExperienceTimeline;
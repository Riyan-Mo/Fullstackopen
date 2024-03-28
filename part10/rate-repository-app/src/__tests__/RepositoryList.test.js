import { render, screen } from "@testing-library/react-native";
import { RepositoryListContainer } from "../components/RepositoryList";

function roundNumber(number){
    return (number/1000).toFixed(1)+"k";
}

describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
      it('renders repository information correctly', () => {
        const repositories = {
          totalCount: 8,
          pageInfo: {
            hasNextPage: true,
            endCursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          edges: [
            {
              node: {
                id: 'jaredpalmer.formik',
                fullName: 'jaredpalmer/formik',
                description: 'Build forms in React, without the tears',
                language: 'TypeScript',
                forksCount: 1619,
                stargazersCount: 21856,
                ratingAverage: 88,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars2.githubusercontent.com/u/4060187?v=4',
              },
              cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
            },
            {
              node: {
                id: 'async-library.react-async',
                fullName: 'async-library/react-async',
                description: 'Flexible promise-based React data loader',
                language: 'JavaScript',
                forksCount: 69,
                stargazersCount: 1760,
                ratingAverage: 72,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars1.githubusercontent.com/u/54310907?v=4',
              },
              cursor:
                'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            },
          ],
        };
  
        render(<RepositoryListContainer repositories={repositories}/>)

        const [firstRepositoryItem, secondRepositoryItem] = screen.getAllByTestId('repositoryItem');

        const [firstRepository, secondRepository] = repositories.edges.map(repo=>repo.node);

        let {forksCount: forksCount1, reviewCount: reviewCount1, stargazersCount: stargazersCount1} = firstRepository;

        let {forksCount: forksCount2, reviewCount: reviewCount2, stargazersCount: stargazersCount2} = secondRepository;

        forksCount1 = forksCount1>=1000?roundNumber(forksCount1):forksCount1;
        reviewCount1 = reviewCount1>=1000?roundNumber(reviewCount1):reviewCount1;
        stargazersCount1 = stargazersCount1>=1000?roundNumber(stargazersCount1):stargazersCount1;

        forksCount2 = forksCount2>=1000?roundNumber(forksCount2):forksCount2;
        reviewCount2 = reviewCount2>=1000?roundNumber(reviewCount2):reviewCount2;
        stargazersCount2 = stargazersCount2>=1000?roundNumber(stargazersCount2):stargazersCount2;

        expect(firstRepositoryItem).toHaveTextContent(firstRepository.fullName);
        expect(firstRepositoryItem).toHaveTextContent(firstRepository.description);
        expect(firstRepositoryItem).toHaveTextContent(firstRepository.language);
        expect(firstRepositoryItem).toHaveTextContent(forksCount1);
        expect(firstRepositoryItem).toHaveTextContent(stargazersCount1);
        expect(firstRepositoryItem).toHaveTextContent(firstRepository.ratingAverage);
        expect(firstRepositoryItem).toHaveTextContent(reviewCount1);

        expect(secondRepositoryItem).toHaveTextContent(secondRepository.fullName);
        expect(secondRepositoryItem).toHaveTextContent(secondRepository.description);
        expect(secondRepositoryItem).toHaveTextContent(secondRepository.language);
        expect(secondRepositoryItem).toHaveTextContent(forksCount2);
        expect(secondRepositoryItem).toHaveTextContent(stargazersCount2);
        expect(secondRepositoryItem).toHaveTextContent(secondRepository.ratingAverage);
        expect(secondRepositoryItem).toHaveTextContent(reviewCount2);

      });
    });
  });
